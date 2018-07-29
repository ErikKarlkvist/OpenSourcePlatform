import firebase from "./firebase";

export function validateGithubURL(gitURL) {
  if (gitURL.includes("https://github.com/")) {
    gitURL = gitURL.replace("https://github.com/", "");
    let split = gitURL.split("/");
    if (split.length === 2) {
      return true;
    }
  }
  return false;
}

export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export async function hasVerifiedEmail() {
  await firebase.auth().currentUser.reload();
  return firebase.auth().currentUser.emailVerified;
}
