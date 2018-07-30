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
  console.log("Running generate-mock-data");
  fs.readFile("scripts/mock-data.txt", (err, data) => {
    data = JSON.parse(data);

    setupData(data);
  });
} catch (e) {
  console.error("ERROR:", e.message);
}

async function setupData(data) {
  await setupProjects(data.projects);
  await setupUsers(data.users);
  console.log("Successfully generated data");
  console.log("");
  console.log("hit ctrl + c to exit");
  return true;
}

async function setupProjects(projects) {
  console.log("Creating mock projects");
  let promises = [];
  //create owners
  projects.forEach(project => {
    console.log("");
    console.log("Creating owners for project: " + project.id);
    if (project.owners) {
      project.owners.forEach(owner => {
        console.log("Creating owner: " + owner.id);
        promises.push(
          firebase
            .firestore()
            .collection("projects")
            .doc(project.id)
            .collection("owners")
            .doc(owner.id)
            .set(owner)
        );
      });
    }
  });

  //create thumbnails
  projects.forEach(project => {
    console.log("");
    console.log("Creating thumbnails for project: " + project.id);
    if (project.thumbnails) {
      project.thumbnails.forEach(thumbnail => {
        console.log("Creating thumbnail: " + thumbnail.id);
        promises.push(
          firebase
            .firestore()
            .collection("projects")
            .doc(project.id)
            .collection("thumbnails")
            .doc(thumbnail.id)
            .set(thumbnail)
        );
      });
    }
  });

  await Promise.all(promises);
  console.log("");
  promises = [];
  projects.forEach(project => {
    console.log("Creating project: " + project.id);

    //these are created first (above) and then removed in order to not create an array in firebase but a collection inside the projects
    delete project.thumbnails;
    delete project.owners;
    promises.push(
      firebase
        .firestore()
        .collection("projects")
        .doc(project.id)
        .set(project)
    );
  });

  await Promise.all(promises);
  console.log("");
  console.log("Successfully created mock projects");
  console.log("");
  return true;
}

async function setupUsers(users) {
  console.log("");
  console.log("Creating mock users");
  const promises = [];
  users.forEach(user => {
    console.log("Creating user: " + user.id);
    promises.push(
      firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .set(user)
    );
  });

  await Promise.all(promises);
  console.log("");
  console.log("Successfully created mock users");
  console.log("");
  return true;
}
