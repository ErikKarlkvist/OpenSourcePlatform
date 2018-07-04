
import React, { Component } from "react";
import firebase from "./backend/firebase";
import HomePage from "./pages/HomePage";
import "./resources/fonts.css"
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
    return (

      <HomePage />
    );
  }
}

export default App;
