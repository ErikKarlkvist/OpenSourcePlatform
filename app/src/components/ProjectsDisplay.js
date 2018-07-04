import React, { Component } from "react";
import ProjectBlurb from "./ProjectBlurb";
import "./ProjectsDisplay.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ProjectsDisplay extends Component {
  render() {
    const data = this.props.projects;

    const items = data.map(d => (
      <div class="ProjectCard col-md-6 col-sm-12 col-lg-4">
        <Link to={`project/${d.id}`}>
          <ProjectBlurb project={d}/>
        </Link>
      </div>
    ));

    return (
      <div class ="ProjectContainer">
        <div class="row">{items}</div>
      </div>
    );
  }
}

export default ProjectsDisplay;
