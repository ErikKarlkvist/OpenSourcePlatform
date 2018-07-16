import firebase from "./firebase";
import { sendJoinRequestMail } from "./email";
import { uploadHeaderImage } from "./storage";

const storage = window.localStorage;

export async function getAllProjects() {
  const allProjects = storage.getItem("projects");
  if (allProjects) {
    //fetch new data in background
    getAllProjectsHelper();
    return Promise.resolve(JSON.parse(allProjects));
  } else {
    //get all data and return when fetched
    return getAllProjectsHelper();
  }
}

export async function getProject(id) {
  let allProjects = storage.getItem("projects");
  if (allProjects) {
    allProjects = JSON.parse(allProjects);
    let foundProject = undefined;

    //use normal for loop instead of forEach so that one can return project directly
    for (let i = 0; i < allProjects.length; i++) {
      if (allProjects[i].id === id) {
        //update all projects in background
        getAllProjectsHelper();
        return Promise.resolve(allProjects[i]);
      }
    }
  }
  //retrieve single project directly if allProjects does not exists or project not found
  const snapshot = await firebase
    .firestore()
    .collection("projects")
    .doc(id)
    .get();
  if (snapshot.exists) {
    let projectData = snapshot.data();
    projectData.id = snapshot.id;

    const ownerData = await getOwnersForProject(projectData);
    const thumbnailData = await getThumbnailsForProject(projectData);

    projectData.owners = ownerData.owners;
    projectData.thumbnails = thumbnailData.thumbnails;

    //update all projects in background
    getAllProjectsHelper();
    return Promise.resolve(projectData);
  } else {
    // doc.data() will be undefined in this case
  }
}

//adds a user to "joinRequest" array in the specified project - admin can now see who requesteded to join
//user has to be signed in
export async function requestJoinProject(project) {
  if (!firebase.auth().currentUser) {
    throw new Error("Not logged in");
  }

  const userUid = firebase.auth().currentUser.uid;
  const requests = project.joinRequest || [];

  requests.forEach(uid => {
    if (uid === userUid) {
      throw new Error("User already requested");
    }
  });

  requests.push(userUid);

  await firebase
    .firestore()
    .collection("projects")
    .doc(project.id)
    .set({ joinRequest: requests }, { merge: true });
  //await sendJoinRequestMail(project.creator.email, user, project)
  return Promise.resolve("success");
}

//removes a user from "joinRequest" array in the specified project. User has to be signed in
export async function removeRequestProject(project) {
  if (!firebase.auth().currentUser) {
    throw new Error("Not logged in");
  }

  const userUid = firebase.auth().currentUser.uid;
  const requests = project.joinRequest || [];

  const index = requests.indexOf(userUid);
  requests.splice(index, 1);

  requests.push(userUid);

  await firebase
    .firestore()
    .collection("projects")
    .doc(project.id)
    .set({ joinRequest: requests }, { merge: true });
  //await sendJoinRequestMail(project.creator.email, user, project)
  return Promise.resolve("success");
}

export async function createNewProjectID() {
  return firebase
    .firestore()
    .collection("projects")
    .doc().id;
}

export async function createNewProject(projectData, id) {
  console.log(projectData);
  await firebase
    .firestore()
    .collection("projects")
    .doc(id)
    .set(projectData)
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });

  uploadHeaderImage(projectData.headerImageURL, projectData.name);
}

//----------------------------------_HELPER ---------------------------------

async function getAllProjectsHelper() {
  const snapshots = await firebase
    .firestore()
    .collection("projects")
    .get();
  let toolsData = [];
  let ownersData = [];
  let creatorsData = [];
  let thumbnailsData = [];
  const projects = [];
  snapshots.forEach(snapshot => {
    if (snapshot.exists) {
      const data = snapshot.data();
      data.id = snapshot.id;

      projects.push(data);

      ownersData.push(getOwnersForProject(data));
      creatorsData.push(getCreatorForProject(data));
      toolsData.push(getToolsForProject(data));
      thumbnailsData.push(getThumbnailsForProject(data));
    }
  });

  //load in everything simultainously.
  //TODO: Add asyncstorage, redux (too complicated?) or some other system to cache the data.

  toolsData = await Promise.all(toolsData);
  thumbnailsData = await Promise.all(thumbnailsData);
  creatorsData = await Promise.all(creatorsData);
  ownersData = await Promise.all(ownersData);

  //loop everything to correct place.
  //TODO: Should be a better way, maybe ignore some if they are not necessery like toolsData & creatorsData
  projects.forEach(project => {
    ownersData.forEach(data => {
      if (data.projectId === project.id) {
        if (data.error) {
          const index = projects.indexOf(project);
          projects.splice(index, 1);
        } else {
          project.owners = data.owners;
        }
      }
    });

    toolsData.forEach(data => {
      if (data.projectId === project.id) {
        if (data.error) {
          const index = projects.indexOf(project);
          projects.splice(index, 1);
        } else {
          project.tools = data.tools;
        }
      }
    });

    creatorsData.forEach(data => {
      if (data.projectId === project.id) {
        if (data.error) {
          const index = projects.indexOf(project);
          projects.splice(index, 1);
        } else {
          project.creator = data.creator;
        }
      }
    });

    thumbnailsData.forEach(data => {
      if (data.projectId === project.id) {
        if (data.error) {
          const index = projects.indexOf(project);
          projects.splice(index, 1);
        } else {
          project.thumbnails = data.thumbnails;
        }
      }
    });
  });
  storage.setItem("projects", JSON.stringify(projects));
  return Promise.resolve(projects);
}

//loads tools for specified project
async function getToolsForProject(project) {
  try {
    let snapshots = await firebase
      .firestore()
      .collection("projects")
      .doc(project.id)
      .collection("tools")
      .get();
    const tools = [];
    snapshots.forEach(snapshot => {
      if (snapshot.exists) {
        const data = snapshot.data();
        tools.push(data);
      }
    });
    const data = { tools, projectId: project.id };
    return Promise.resolve(data);
  } catch (e) {
    return Promise.resolve({ error: true, projectId: project.id });
  }
}

//loads owners for specified project
async function getOwnersForProject(project) {
  let snapshots = await firebase
    .firestore()
    .collection("projects")
    .doc(project.id)
    .collection("owners")
    .get();
  const owners = [];
  const promises = [];
  const ref = firebase.firestore().collection("users");
  snapshots.forEach(snapshot => {
    if (snapshot.exists) {
      promises.push(
        ref
          .doc(snapshot.data().userID)
          .get()
          .then(userData => {
            owners.push({ ...userData.data(), ...snapshot.data() });
          })
      );
    }
  });
  await Promise.all(promises);
  const data = { owners, projectId: project.id };
  return Promise.resolve(data);
}

//loads creator for specified project
async function getCreatorForProject(project) {
  try {
    const creator = await firebase
      .firestore()
      .collection("users")
      .doc(project.creator)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          const user = snapshot.data();
          user.id = snapshot.id;
          return Promise.resolve(user);
        } else {
          return Promise.resolve({ id: "No user" });
        }
      });
    const data = { creator, projectId: project.id };
    return Promise.resolve(data);
  } catch (e) {
    return Promise.resolve({ error: true, projectId: project.id });
  }
}

//loads thumbnails for specified project
async function getThumbnailsForProject(project) {
  try {
    let snapshots = await firebase
      .firestore()
      .collection("projects")
      .doc(project.id)
      .collection("thumbnails")
      .get();
    const thumbnails = [];
    snapshots.forEach(snapshot => {
      if (snapshot.exists) {
        const data = snapshot.data();
        thumbnails.push(data);
      }
    });
    const data = { thumbnails, projectId: project.id };
    return Promise.resolve(data);
  } catch (e) {
    return Promise.resolve({ error: true, projectId: project.id });
  }
}
