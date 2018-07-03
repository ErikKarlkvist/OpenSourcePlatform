import firebase from "./firebase"

let isLoggedIn = false;

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

export async function login(email, password){
  await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    return Promise.reject(error);
  });
  console.log(firebase.auth())
  return Promise.resolve(true)
}

export async function logout(){
  await firebase.auth().signOut().catch(function(error) {
    return Promise.reject(error);
  });
  console.log(firebase.auth())
  return Promise.resolve(true)
}

export function isLoggedIn(){
  return isLoggedIn;
}

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
});
