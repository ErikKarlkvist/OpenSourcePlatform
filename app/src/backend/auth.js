import firebase from "./firebase"

let isLoggedIn = false;

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
