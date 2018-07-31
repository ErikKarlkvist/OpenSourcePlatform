//documentation https://firebase.google.com/docs/firestore/
//https://firebase.google.com/docs/auth/web/password-auth
import firebase from "./firebase";
export async function getUser(uid) {
  const snapshot = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get();
  if (snapshot.exists) {
    const userData = snapshot.data();
    if (!userData.profileImageURL) {
      userData.profileImageURL =
        "https://firebasestorage.googleapis.com/v0/b/opensourceplatformtesting.appspot.com/o/resources%2FblankProfile.png?alt=media&token=5fd23b76-d5f6-4bb0-b4c3-11979905cc4b";
    }
    userData.id = snapshot.id;
    return userData;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function setUser(uid, user) {
  await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set(user)
    .catch(function(error) {
      return Promise.reject(error);
    });
}

export async function getAllUsers() {
  const snapshots = await firebase
    .firestore()
    .collection("users")
    .get();
  const users = [];
  snapshots.forEach(snapshot => {
    if (snapshot.exists) {
      const data = snapshot.data();
      if (!data.profileImageURL) {
        data.profileImageURL =
          "https://firebasestorage.googleapis.com/v0/b/opensourceplatformtesting.appspot.com/o/resources%2FblankProfile.png?alt=media&token=5fd23b76-d5f6-4bb0-b4c3-11979905cc4b";
      }
      data.id = snapshot.id;
      users.push(data);
    }
  });

  return Promise.resolve(users);
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
