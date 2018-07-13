import React, { Component } from "react";
import logo from "../logo.svg";
import "../resources/Main.css";
import { getAllProjects } from "../backend/projects";
import { getUser } from "../backend/users.js";
import ProjectsDisplay from "../components/ProjectsDisplay";
import LoginRegister from "../components/LoginRegister";
import Line from "../components/Line";
import Spinner from "../components/Spinner";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import firebase from "../backend/firebase";
import LoginForm from "../components/LoginForm";
import Seeking from "../components/Seeking";
import "../resources/fonts.css";

class HenningsPage extends Component {
  constructor() {
    super();
    this.state = {
      currentlyViewing: [],
      loading: true,
      isLoggedIn: false,
      hasFetchedUser: false
    };
  }

  componentDidMount() {
    getAllProjects().then(projects => {
      this.setState({
        currentlyViewing: projects,
        allProjects: projects,
        liveProjects: [projects[0]],
        graduateProjects: [projects[projects.length - 1]],
        loading: false
      });
    });

    this.setupAuthStateChange();
  }

  setupAuthStateChange() {
    const page = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        getUser(user.uid).then(user => {
          page.setState({
            isLoggedIn: true,
            hasFetchedUser: true,
            user
          });
        });
      } else {
        page.setState({
          isLoggedIn: false,
          hasFetchedUser: true
        });
      }
    });
  }

  render() {
    return (
      <div class="pageContainer">
        <div>
          <Seeking />
        </div>
        <div>
          <h1>HEI</h1>
          <h2>HEI</h2>
          <h3>HEI</h3>
          <h4>HEI</h4>
        </div>
      </div>
    );
  }
}
export default HenningsPage;
