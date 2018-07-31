import firebase from "./firebase";
import { getUser } from "./users";
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

/* PROJECTDATA
  name: 
      description: 
      lookingFor: 
      gitURL:
      readmeURL:
      contactMail: 
      creator: 
      headerImageURL:,
      owners: 
      thumbnails: 
  */
export async function createNewProject(projectData, id) {
  const owners = projectData.owners.slice();
  const thumbnails = projectData.thumbnails.slice();

  delete projectData.owners;
  delete projectData.thumbnails;

  projectData.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  await firebase
    .firestore()
    .collection("projects")
    .doc(id)
    .set(projectData);

  const promises = [];
  for (let i = 0; i < thumbnails.length; i++) {
<<<<<<< HEAD
    thumbnails[i].createdAt = firebase.firestore.FieldValue.serverTimestamp();
=======
>>>>>>> aed3dbeb8165230c790d4536763f09c143a57b0f
    promises.push(
      firebase
        .firestore()
        .collection("projects")
        .doc(id)
        .collection("thumbnails")
        .add(thumbnails[i])
    );
  }

  for (let j = 0; j < owners.length; j++) {
    promises.push(
      firebase
        .firestore()
        .collection("projects")
        .doc(id)
        .collection("owners")
        .doc((j + 1).toString())
        .set({ role: owners[j].role, userID: owners[j].id })
    );
  }

  await Promise.all(promises);
  //reload all project on update
  await getAllProjectsHelper();
  return Promise.resolve(true);
}

export async function updateProject(projectData, id) {
  const owners = projectData.owners.slice();
  const thumbnails = projectData.thumbnails.slice();

  delete projectData.owners;
  delete projectData.thumbnails;

  projectData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();

  await firebase
    .firestore()
    .collection("projects")
    .doc(id)
    .set(projectData, { merge: true });

  const promises = [];
  for (let i = 0; i < thumbnails.length; i++) {
<<<<<<< HEAD
    thumbnails[i].createdAt = firebase.firestore.FieldValue.serverTimestamp();
=======
>>>>>>> aed3dbeb8165230c790d4536763f09c143a57b0f
    if (thumbnails[i].id) {
      promises.push(
        firebase
          .firestore()
          .collection("projects")
          .doc(id)
          .collection("thumbnails")
          .doc(thumbnails[i].id)
          .set(thumbnails[i], { merge: true })
      );
    } else {
      promises.push(
        firebase
          .firestore()
          .collection("projects")
          .doc(id)
          .collection("thumbnails")
          .add(thumbnails[i])
      );
    }
  }

  for (let j = 0; j < owners.length; j++) {
    promises.push(
      firebase
        .firestore()
        .collection("projects")
        .doc(id)
        .collection("owners")
        .doc((j + 1).toString())
<<<<<<< HEAD
        .set({ role: owners[j].role, userID: owners[j].userID })
=======
        .set({ role: owners[j].role, userID: owners[j].id })
>>>>>>> aed3dbeb8165230c790d4536763f09c143a57b0f
    );
  }

  await Promise.all(promises);
  //reload all project on update
  await getAllProjectsHelper();
  return Promise.resolve(true);
}

export async function getProjectsForUser(uid) {
  if (!uid) {
    throw new Error("UID undefined");
  }

  let allProjects = storage.getItem("projects");
  if (allProjects) {
    allProjects = JSON.parse(allProjects);
  } else {
    allProjects = await getAllProjectsHelper();
  }

  const userProjects = [];
  allProjects.forEach(project => {
    project.owners.forEach(owner => {
      if (owner.id === uid) {
        userProjects.push(project);
      }
    });
  });

  return Promise.resolve(userProjects);
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
        data.id = snapshot.id;
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
  snapshots.forEach(snapshot => {
    if (snapshot.exists) {
      promises.push(
        getUser(snapshot.data().userID).then(userData => {
          owners.push({ ...userData, ...snapshot.data() });
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
    const creator = await getUser(project.creator);
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
    let thumbnails = [];
    snapshots.forEach(snapshot => {
      if (snapshot.exists) {
        const data = snapshot.data();
        data.id = snapshot.id;
        thumbnails.push(data);
      }
    });
    thumbnails = sortOnCreatedAt(thumbnails);
    const data = { thumbnails, projectId: project.id };
    return Promise.resolve(data);
  } catch (e) {
    return Promise.resolve({ error: true, projectId: project.id });
  }
}

function sortOnCreatedAt(array) {
  return array.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return a.createdAt - b.createdAt;
    } else if (a.createdAt) {
      return a.createdAt;
    } else {
      return b;
    }
  });
}
