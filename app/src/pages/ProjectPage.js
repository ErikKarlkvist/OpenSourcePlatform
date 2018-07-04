import React, { Component } from "react";
import logo from "../logo.svg";
import "./HomePage.css";
import { getAllProjects, getProject } from "../backend/projects";
import ProjectsDisplay from "../components/ProjectsDisplay";
import LoginRegister from "../components/LoginRegister"
import FilterProjects from "../components/FilterProjects"
import Line from "../components/Line"

class ProjectPage extends Component {
  constructor() {
    super();
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
          <h2 className="App-intro">
            Give your contribution
          </h2>
          <div style={{marginTop: 30, marginBottom: 30}}>
            <Line style={{marginBottom: 10}}/>

          </div>
        </div>
      </div>
    );
  }
}

export default ProjectPage;
