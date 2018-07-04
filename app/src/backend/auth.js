import firebase from "./firebase"

let isLoggedIn = false;

export async function register(firstname, lastname, email, password){
  const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    return Promise.reject(error);
  });
  console.log(newUser)
  const user = {firstname, lastname, email};
  console.log(user)
  await firebase.firestore().collection("users").doc(newUser.user.uid).set(user).catch(function(error){
    return Promise.reject(error);
  });
  return true;
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
