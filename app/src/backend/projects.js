import firebase from "./firebase"

export async function getAllProjects(){
  const snapshots = await firebase.firestore().collection("projects").get();
  const promises = [];
  snapshots.forEach(snapshot => {
    if(snapshot.exists){
      const data = snapshot.data();
      data.id = snapshot.id;
      promises.push(getToolsForProject(data));
    }
  });

  const projects = await Promise.all(promises);
  console.log(projects)
  return Promise.resolve(projects);
}

export async function getProject(id){
  const snapshot = await firebase.firestore().collection("projects").doc(id).get();
  if(snapshot.exists){
    let projectData = snapshot.data();
    projectData.id = snapshot.id;
    projectData = await getToolsForProject(projectData);
    console.log(projectData)
    return Promise.resolve(projectData);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

async function getToolsForProject(project){
  let snapshots = await firebase.firestore().collection("projects").doc(project.id).collection("tools").get();
  project.tools = [];
  snapshots.forEach(snapshot => {
    if(snapshot.exists){
      const data = snapshot.data();
      project.tools.push(data)
    }
  });
  return Promise.resolve(project);
}
