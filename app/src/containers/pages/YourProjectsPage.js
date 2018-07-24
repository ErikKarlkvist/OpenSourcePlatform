import React, { Component } from "react";
import logo from "../../logo.svg";
import { getAllProjects } from "../../backend/projects";
import { getUser } from "../../backend/users.js";
import LoginRegister from "../common/LoginRegister";
import Spinner from "../../components/common/Spinner";
import { BrowserRouter as Link } from "react-router-dom";
import firebase from "../../backend/firebase";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      currentlyViewing: [],
      loading: true,
      isLoggedIn: false,
      hasFetchedUser: false,
      picked: "all"
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
      <div className="PageContainer">
        <Spinner
          loading={this.state.loading || !this.state.hasFetchedUser}
          fillPage={true}
        />
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="Logo" alt="logo" />
          </Link>
          <LoginRegister
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            hasFetchedUser={this.state.hasFetchedUser}
          />
        </header>
        <div className="Content">
          <h1 className="App-title Red Green">
            You don't have any projects yet
          </h1>
        </div>
      </div>
    );
  }
}

export default HomePage;
