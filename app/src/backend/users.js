import firebase from "./firebase"

export async function getUser(uid){
  const snapshot = await firebase.firestore().collection("users").doc(uid).get();
  if(snapshot.exists){
    const userData = snapshot.data();
    userData.id = snapshot.id;
    console.log("Document data:", userData);
    return userData;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
