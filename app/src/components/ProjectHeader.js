import React, { Component } from "react";
import ProjectBlurb from "./ProjectBlurb";
import "./ProjectsDisplay.css";
import LoginRegister from "../components/LoginRegister"
import logo from "../logo.svg";

class ProjectsDisplay extends Component {
  constructor(props){
    super(props);

  }


  render() {

    return (
      <div>
        <img src={logo} className="Logo" alt="logo" />
        <LoginRegister />
        <div>
          <h1>{this.props.name}</h1>
        </div>
      </div>
    );
  }
}

export default ProjectsDisplay;
