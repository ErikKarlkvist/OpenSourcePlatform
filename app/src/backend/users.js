import firebase from "./firebase"

getUser("mU9vGJ2FRLZxf7AxYK4hJp3efBj2");

async function getUser(uid){
  const snapshot = await firebase.firestore().collection("users").doc(uid).get();
  if(snapshot.exists){
    const userData = snapshot.data();
    console.log("Document data:", userData);
    return userData;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
