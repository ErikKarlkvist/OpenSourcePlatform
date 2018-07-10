import firebase from "./firebase"

export async function register(firstname, lastname, email, password){

  //register new user on firebase authentication
  const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    return Promise.reject(error);
  });
  const user = {firstname, lastname, email};

  //create user document on database
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

export function resetPassword(email){
  return firebase.auth().sendPasswordResetEmail(email)
}
