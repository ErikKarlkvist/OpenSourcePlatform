import React, { Component } from "react";
import logo from "../logo.svg";
import "../resources/Main.css";
import { getAllProjects, getProject } from "../backend/projects";
import ProjectsDisplay from "../components/ProjectsDisplay";
import LoginRegister from "../components/LoginRegister"
import FilterProjects from "../components/FilterProjects"
import Line from "../components/Line"
import Spinner from "../components/Spinner"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UploadImage from "../components/UploadImage"

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      currentlyViewing: [],
      loading: true,
    }
  }

  componentDidMount() {
    getAllProjects().then(projects => {
      this.setState({
        currentlyViewing: projects,
        allProjects: projects,
        liveProjects: [],
        graduateProjects: [],
        loading: false,
      });
    });
  }

  render() {
    return (
      <div class="PageContainer">
        <Spinner loading = {this.state.loading} fillPage={true}/>
        <header className="App-header">
          <Link to="/">
            <img src={logo} class="Logo" alt="logo" />
          </Link>
          <LoginRegister />
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
