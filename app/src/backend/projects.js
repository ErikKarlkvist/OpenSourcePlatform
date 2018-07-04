import firebase from "./firebase"

export async function getAllProjects(){
  const snapshots = await firebase.firestore().collection("projects").get();
  let toolsData = [];
  let developersData = [];
  const projects = [];
  snapshots.forEach(snapshot => {
    if(snapshot.exists){
      const data = snapshot.data();
      data.id = snapshot.id;
      projects.push(data);
      toolsData.push(getToolsForProject(data));
      developersData.push(getDevelopersForProject(data));
    }
  });

  //load in everything simultainously
  toolsData = await Promise.all(toolsData);
  developersData = await Promise.all(developersData);

  //loop everything to correct place
  projects.forEach(project => {
    toolsData.forEach((data) => {
      if(data.projectId === project.id){
        project.tools = data.tools;
      }
    })

    developersData.forEach((data) => {
      if(data.projectId === project.id){
        project.tools = data.developers;
      }
    })
  })

  console.log(projects)

  return Promise.resolve(projects);
}

export async function getProject(id){
  const snapshot = await firebase.firestore().collection("projects").doc(id).get();
  if(snapshot.exists){
    let projectData = snapshot.data();
    projectData.id = snapshot.id;
    projectData.tools = await getToolsForProject(projectData);
    return Promise.resolve(projectData);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

async function getToolsForProject(project){
  let snapshots = await firebase.firestore().collection("projects").doc(project.id).collection("tools").get();
  const tools = [];
  snapshots.forEach(snapshot => {
    if(snapshot.exists){
      const data = snapshot.data();
      tools.push(data)
    }
  });
  const data = {tools, projectId: project.id}
  return Promise.resolve(data);
}

async function getDevelopersForProject(project){
  let developers = [];
  project.developers.forEach((devUid) => {
    developers.push(firebase.firestore().collection("users").doc(devUid).get().then((snapshot) => {
      if(snapshot.exists){
        const developer = snapshot.data()
        developer.uid = snapshot.id;
        return Promise.resolve(developer);
      }
    }))
  })

  developers = await Promise.all(developers);
  const data = {developers, projectId: project.id}
  return Promise.resolve(data);
}
