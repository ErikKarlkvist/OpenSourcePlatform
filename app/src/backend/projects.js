import firebase from "./firebase";
import {sendJoinRequestMail} from "./email"

export async function getAllProjects() {
  const snapshots = await firebase
    .firestore()
    .collection("projects")
    .get();
  let toolsData = [];
  let developersData = [];
  let creatorsData = [];
  let thumbnailsData = [];
  const projects = [];
  snapshots.forEach(snapshot => {
    if (snapshot.exists) {
      const data = snapshot.data();
      data.id = snapshot.id;

      projects.push(data);

      toolsData.push(getToolsForProject(data));
      developersData.push(getDevelopersForProject(data));
      creatorsData.push(getCreatorForProject(data));
      thumbnailsData.push(getThumbnailsForProject(data));
    }
  });

  //load in everything simultainously
  toolsData = await Promise.all(toolsData);
  developersData = await Promise.all(developersData);
  creatorsData = await Promise.all(creatorsData);
  thumbnailsData = await Promise.all(thumbnailsData);

  //loop everything to correct place
  projects.forEach(project => {
    toolsData.forEach(data => {
      if (data.projectId === project.id) {
        project.tools = data.tools;
      }
    });

    developersData.forEach(data => {
      if (data.projectId === project.id) {
        project.developers = data.developers;
      }
    });

    creatorsData.forEach(data => {
      if (data.projectId === project.id) {
        project.creator = data.creator;
      }
    });

    thumbnailsData.forEach(data => {
      if (data.projectId === project.id) {
        project.thumbnails = data.thumbnails;
      }
    });
  });

  return Promise.resolve(projects);
}

export async function getProject(id) {
  const snapshot = await firebase
    .firestore()
    .collection("projects")
    .doc(id)
    .get();
  if (snapshot.exists) {
    let projectData = snapshot.data();
    projectData.id = snapshot.id;

    const toolData = await getToolsForProject(projectData);
    const developerData = await getDevelopersForProject(projectData);
    const creatorData = await getCreatorForProject(projectData);
    const thumbnailData = await getThumbnailsForProject(projectData);

    projectData.tools = toolData.tools;
    projectData.developers = developerData.developers;
    projectData.creator = creatorData.creator;
    projectData.thumbnails = thumbnailData.thumbnails;
    return Promise.resolve(projectData);
  } else {
    // doc.data() will be undefined in this case
  }
}

export async function requestJoinProject(project) {
    if(!firebase.auth().currentUser){
      throw new Error("Not logged in")
    }

    const userUid = firebase.auth().currentUser.uid;
    const requests = project.joinRequest || [];

    requests.forEach(uid => {
      if(uid === userUid){
        throw new Error("User already requested");
      }
    })

    requests.push(userUid)

    await firebase.firestore().collection("projects").doc(project.id).set({joinRequest: requests}, {merge:true})
    //await sendJoinRequestMail(project.creator.email, user, project)
    return Promise.resolve("success")

}

export async function removeRequestProject(project) {
    if(!firebase.auth().currentUser){
      throw new Error("Not logged in")
    }

    const userUid = firebase.auth().currentUser.uid;
    const requests = project.joinRequest || [];

    const index = requests.indexOf(userUid);
    requests.splice(index,1);

    requests.push(userUid)

    await firebase.firestore().collection("projects").doc(project.id).set({joinRequest: requests}, {merge:true})
    //await sendJoinRequestMail(project.creator.email, user, project)
    return Promise.resolve("success")

}

//----------------------------------_HELPER ---------------------------------
async function getToolsForProject(project) {
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
}

async function getDevelopersForProject(project) {
  let developers = [];
  project.developers.forEach(devUid => {
    developers.push(
      firebase
        .firestore()
        .collection("users")
        .doc(devUid)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            const developer = snapshot.data();
            developer.uid = snapshot.id;
            return Promise.resolve(developer);
          }
        })
    );
  });

  developers = await Promise.all(developers);
  const data = { developers, projectId: project.id };
  return Promise.resolve(data);
}

async function getCreatorForProject(project) {
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
}

async function getThumbnailsForProject(project) {
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
}
