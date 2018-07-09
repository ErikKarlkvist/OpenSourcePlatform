import React, { Component } from "react";
import logo from "../logo.svg";
import "../resources/Main.css";
import { getAllProjects } from "../backend/projects";
import {getUser} from "../backend/users.js"
import ProjectsDisplay from "../components/ProjectsDisplay";
import LoginRegister from "../components/LoginRegister";
import FilterProjects from "../components/FilterProjects";
import Line from "../components/Line";
import Spinner from "../components/Spinner";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import firebase from "../backend/firebase";
import LoginForm from "../components/LoginForm";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      currentlyViewing: [],
      loading: true,
      isLoggedIn: false,
      hasFetchedUser: false,
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

  setupAuthStateChange(){
    const page = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        getUser(user.uid).then((user) => {
          page.setState({
            isLoggedIn: true,
            hasFetchedUser: true,
            user
          })
        })

      } else {
        page.setState({
          isLoggedIn: false,
          hasFetchedUser: true,
        })
      }
    });
  }

  render() {
    return (
      <div class="PageContainer">
        <Spinner loading={this.state.loading || !this.state.hasFetchedUser} fillPage={true} />
        <header className="App-header">
          <Link to="/">
            <img src={logo} class="Logo" alt="logo" />
          </Link>
          <LoginRegister isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
        </header>
        <div class="Content">
          <h1 className="App-title">DNB Open Source</h1>
          <h2 className="App-intro">Give your contribution</h2>
          <div style={{ marginTop: 30, marginBottom: 30 }}>
            <Line style={{ marginBottom: 10 }} />
            <FilterProjects changeFilter={this.changeFilter} />
          </div>
          <ProjectsDisplay projects={this.state.currentlyViewing} />
        </div>
      </div>
    );
  }

  changeFilter = picked => {
    if (picked === "all") {
      this.setState({ currentlyViewing: this.state.allProjects });
    } else if (picked === "live") {
      this.setState({ currentlyViewing: this.state.liveProjects });
    } else {
      this.setState({ currentlyViewing: this.state.graduateProjects });
    }
  };
}

export default HomePage;
