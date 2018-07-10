//this file handles data uploads to firebase storage
//documentation at https://firebase.google.com/docs/storage/

import firebase from "./firebase";
const storageService = firebase.storage();
const databaseService = firebase.firestore();
const storageRef = storageService.ref();

//the comments here apply for all image uploading methods
//TODO: Make generic function for all image uploads
export async function uploadHeaderImage(file, projectId) {
  try {

    //ref is the reference point to where the images will be uploaded
    //in this case it will be under {firebaseURL}/projects/projectId/header
    const ref = storageRef.child("projects").child(projectId).child("header");
    //wait for image to upload
    await uploadImage(ref, file);
    //get downloadURL
    const url = await ref.getDownloadURL();

    //store downloadURL
    await databaseService.collection("projects").doc(projectId).set({headerImageURL: url},{merge:true});

    //return downloadURL in case we want to load the image
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
    await uploadImage(ref, file);
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
    await uploadImage(ref, file);
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
      // good to have if we want to render loading bars for images
    }, (error) => {
       reject(error);
    }, () => {
        //image uploaded
       resolve("success");
    });
  });

}
