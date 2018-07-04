import React, { Component } from "react";
import logo from "../logo.svg";
import "./HomePage.css";
import { getAllProjects, getProject } from "../backend/projects";
import ProjectsDisplay from "../components/ProjectsDisplay";
import LoginRegister from "../components/LoginRegister";
class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    getAllProjects().then(projects => {
      this.setState({ projects });
    });
  }

  render() {
    return (
      <div class="HomePage">
        <header className="App-header">
          <img src={logo} className="Logo" alt="logo" />
          <LoginRegister />
        </header>
        <div class="Content">
          <h1 className="App-title">DNB Open Source</h1>
          <h2 className="App-intro">Give your contribution</h2>
          <ProjectsDisplay projects={this.state.projects} />
        </div>
      </div>
    );
  }
}

export default HomePage;
