import React, { Component } from "react";
import firebase from "./backend/firebase";
import ProjectsDisplay from "./components/ProjectsDisplay";
import ProjectBlurb from "./components/ProjectBlurb";

//login("henninnenesgrd@gmail.com", "123456789");
//https://api.trello.com/1/members/me/?key=85873074232e857f4e364a3ef1b545a3&token=ff6a08c9b2fc1df53138d4f788122032fd7d7ae93bb6919f1d81d1c5cd8af10b
import HomePage from "./pages/HomePage";
class App extends Component {
  constructor() {
    super();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("USER IS SIGNED IN");
        // ...
      } else {
        console.log("USER IS SIGNED OUT");
      }
    });
  }

  render() {
    return <HomePage />;
  }
}

export default App;
