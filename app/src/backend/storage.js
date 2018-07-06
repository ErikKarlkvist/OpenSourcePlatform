import firebase from "./firebase";
const storageService = firebase.storage();
const databaseService = firebase.firestore();
const storageRef = storageService.ref();

export async function uploadHeaderImage(file, projectId) {
  try {
    const ref = storageRef.child("projects").child(projectId).child("header");
    const output = await uploadImage(ref, file);
    const url = await ref.getDownloadURL();

    await databaseService.collection("projects").doc(projectId).set({headerImageURL: url},{merge:true});
    return Promise.resolve({status: "Success", downloadURL:url});
  } catch (e) {
    //handle error somehow
    console.log(e)
    return Promise.reject(e);
  }
}

export async function uploadThumbnailImage(file, projectId) {
  try {
    const ref = storageRef.child("projects").child(projectId).child("thumbnails").child(file.name);
    const output = await uploadImage(ref, file);
    const url = await ref.getDownloadURL();

    await databaseService.collection("projects").doc(projectId).collection("thumbnails").add({
      url,
      name: file.name,
    })

    return Promise.resolve({status: "Success", downloadURL:url});
  } catch (e) {
    //handle error somehow
    console.log(e)
    return Promise.reject(e);
  }
}

export async function uploadProfileImage(file, userId) {
  try {
    const ref = storageRef.child("users").child(userId).child("profile");
    const output = await uploadImage(ref, file);
    const url = await ref.getDownloadURL();

    await databaseService.collection("users").doc(userId).set({profileImageURL: url},{merge:true});

    return Promise.resolve({status: "Success", downloadURL:url});
  } catch (e) {
    //handle error somehow
    console.log(e)
    return Promise.reject(e);
  }
}

async function uploadImage(ref, file){

  return new Promise(function(resolve, reject) {
    const uploadTask = ref.put(file);
    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      console.log(snapshot)
    }, (error) => {
       reject(error);
    }, () => {
      //success
       resolve("success");
    });
  });

}
