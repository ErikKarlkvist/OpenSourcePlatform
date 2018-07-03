import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getUser } from "./backend/users";
import { getAllProjects, getProject } from "./backend/projects";
import { login, logout, getAllUsers } from "./backend/users";
import firebase from "./backend/firebase";
import ProjectsDisplay from "./components/ProjectsDisplay";

login("henninnenesgrd@gmail.com", "123456789");
//https://api.trello.com/1/members/me/?key=85873074232e857f4e364a3ef1b545a3&token=ff6a08c9b2fc1df53138d4f788122032fd7d7ae93bb6919f1d81d1c5cd8af10b
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
    this.state = { projects: [], users: [] };
  }

  componentDidMount() {
    getAllProjects().then(projects => {
      this.setState({ projects });
    });

    getAllUsers().then(users => {
      console.log("USERS");

      //Gets name so that this works with ProjectsDisplay. Should probably use setState({users})
      const usernames = users.map(d => {
        return { name: d.firstname + " " + d.lastname };
      });
      this.setState({ users: usernames });
    });
  }

  render() {
    console.log("!", this.state);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ProjectsDisplay projects={this.state.projects} />
        <ProjectsDisplay projects={this.state.users} />
      </div>
    );
  }
}

export default App;
