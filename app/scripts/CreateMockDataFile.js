const fs = require("fs");
const firebase = require("firebase");
const keys = require("../src/backend/firebaseKeys");

firebase.initializeApp({
  apiKey: keys.apiKey,
  authDomain: keys.authDomain,
  databaseURL: keys.databaseURL,
  projectId: keys.projectId,
  storageBucket: keys.storageBucket,
  messagingSenderId: keys.messagingSenderId
});

try {
  console.log("Running create-mock-data-file");
  console.log("");
  console.log(
    "Please note that image URLs will not work if they are removed from the database being mocked"
  );
  console.log("");

  createFile();
} catch (e) {
  throw e;
  console.error("ERROR:", e.message);
}

async function createFile() {
  const projects = await getAllProjects();
  const users = await getAllUsers();

  let data = {
    projects,
    users
  };

  data = JSON.stringify(data);

  fs.writeFile("scripts/mock-data.txt", data, function(err) {
    if (err) throw err;
    console.log("");
    console.log("Successfully created file mock-data.txt in scripts/");
    console.log("");
    console.log("type ctrl + c to exit");
  });

  return true;
}

async function getAllProjects() {
  console.log("Retrieving all projects");
  const projectSnapshots = await firebase
    .firestore()
    .collection("projects")
    .get();

  const promises = [];
  projectSnapshots.forEach(snapshot => {
    console.log("Retriving project: " + snapshot.id);
    const project = snapshot.data();
    project.id = snapshot.id;
    console.log("Retriving owners for project: " + snapshot.id);
    promises.push(
      getCollectionForProject(project.id, "owners").then(owners => {
        project.owners = owners;
        console.log("Successfully retrieved owners for project: " + project.id);
        console.log("Retriving thumbnails for project: " + project.id);
        return getCollectionForProject(project.id, "thumbnails").then(
          thumbnails => {
            console.log(
              "Successfully retrieved thumbnails for project: " + project.id
            );
            project.thumbnails = thumbnails;
            console.log("Successfully retrieved project: " + project.id);
            return Promise.resolve(project);
          }
        );
      })
    );
  });

  const projects = await Promise.all(promises);
  return projects;
}

function getCollectionForProject(projectId, type) {
  return firebase
    .firestore()
    .collection("projects")
    .doc(projectId)
    .collection(type)
    .get()
    .then(snapshots => {
      const datapoints = [];
      snapshots.forEach(snapshot => {
        const data = snapshot.data();
        data.id = snapshot.id;
        datapoints.push(data);
      });
      return Promise.resolve(datapoints);
    });
}

async function getAllUsers() {
  console.log("");
  console.log("Retrieving all users");
  const userSnapshots = await firebase
    .firestore()
    .collection("users")
    .get();

  const users = [];
  userSnapshots.forEach(snapshot => {
    console.log("Successfully retrieved user: " + snapshot.id);
    const user = snapshot.data();
    user.id = snapshot.id;
    users.push(user);
  });

  return users;
}
