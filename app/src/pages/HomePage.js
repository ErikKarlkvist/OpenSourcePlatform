import React, { Component } from "react";
import logo from "../logo.svg";
import "./HomePage.css";
import { getAllProjects, getProject } from "../backend/projects";
import ProjectsDisplay from "../components/ProjectsDisplay";
import LoginRegister from "../components/LoginRegister"
import FilterProjects from "../components/FilterProjects"

class HomePage extends Component {
  constructor() {
    super();
    this.state = {

      currentlyViewing: []
    }
  }

  componentDidMount() {
    getAllProjects().then(projects => {
      this.setState({ 
        currentlyViewing: projects,
        allProjects: projects,
        liveProjects: [],
        graduateProjects: [] 
      });
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
          <h2 className="App-intro">
            Give your contribution
          </h2>
          <FilterProjects changeFilter = {this.changeFilter}/>
          <ProjectsDisplay projects={this.state.currentlyViewing} />
        </div>
      </div>
    );
  }


  changeFilter = (picked) => {
    if(picked === "all"){
      this.setState({currentlyViewing: this.state.allProjects})
    } else if(picked === "live"){
      this.setState({currentlyViewing: this.state.liveProjects})
    } else{
      this.setState({currentlyViewing: this.state.graduateProjects})
    }
  }
}

export default HomePage;
