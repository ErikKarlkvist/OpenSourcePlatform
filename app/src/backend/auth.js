import firebase from "./firebase";

export async function register(firstname, lastname, email, password) {
  //register new user on firebase authentication
  const newUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      return Promise.reject(error);
    });
  const user = { firstname, lastname, email, description: "" };

  //create user document on database
  await firebase
    .firestore()
    .collection("users")
    .doc(newUser.user.uid)
    .set(user)
    .catch(function(error) {
      return Promise.reject(error);
    });

  firebase.auth().currentUser.sendEmailVerification();
  return true;
}

export async function login(email, password) {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      return Promise.reject(error);
    });
  console.log(firebase.auth());
  return Promise.resolve(true);
}

export async function logout() {
  await firebase
    .auth()
    .signOut()
    .catch(function(error) {
      return Promise.reject(error);
    });
  console.log(firebase.auth());
  return Promise.resolve(true);
}

//TODO: should maybe not alert here, fix later
export function resetPassword(email) {
  if (!email) {
    if (firebase.auth().currentUser) {
      email = firebase.auth().currentUser.email;
    } else {
      alert("No email provided");
    }
  }

  return firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("An email has been sent to your account");
    })
    .catch(e => {
      alert("Something went wrong", e.message);
    });
}

//TODO: should maybe not alert here, fix later
export function resendVerificationEmail() {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      alert("An email has been sent to your account");
    })
    .catch(e => {
      alert("Something went wrong", e.message);
    });
}
