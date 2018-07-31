import React, { Component } from "react";
import logo from "../../logo.svg";
import { getAllProjects } from "../../backend/projects";
import { getUser } from "../../backend/users.js";
import ProjectsDisplay from "../../components/homePage/ProjectsDisplay";
import HeaderMenu from "../common/HeaderMenu";
import FilterProjects from "../../components/homePage/FilterProjects";
import Line from "../../components/common/Line";
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
        liveProjects: [projects[0], projects[1], projects[projects.length - 1]],
        graduateProjects: [projects[2]],
        loading: false
      });
    });

    this.issueTest();

    this.setupAuthStateChange();
  }

  issueTest() {}

  setupAuthStateChange() {
    const page = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //resendVerificationEmail();
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
          <HeaderMenu
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            hasFetchedUser={this.state.hasFetchedUser}
          />
        </header>
        <div className="Content">
          <h1 className="App-title Red Green">DNB Open Source</h1>
          <h2 className="App-intro">Contribute & Innovate</h2>
          <div style={{ marginTop: 30, marginBottom: 30 }}>
            <Line style={{ marginBottom: 10 }} />
            <FilterProjects
              changeFilter={this.changeFilter}
              picked={this.state.picked}
            />
          </div>
          <div className="Center">
            <ProjectsDisplay projects={this.state.currentlyViewing} />
          </div>
        </div>
      </div>
    );
  }

  changeFilter = picked => {
    if (picked === "all") {
      this.setState({ currentlyViewing: this.state.allProjects, picked });
    } else if (picked === "live") {
      this.setState({ currentlyViewing: this.state.liveProjects, picked });
    } else {
      this.setState({ currentlyViewing: this.state.graduateProjects, picked });
    }
  };
}

export default HomePage;
