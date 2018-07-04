import React, { Component } from "react";
import ProjectBlurb from "./ProjectBlurb";
import "./ProjectsDisplay.css";

class ProjectsDisplay extends Component {
  render() {
    const data = this.props.projects;

    const items = data.map(d => (
      <div class="ProjectCard col-md-6 col-sm-12 col-lg-4">
        <ProjectBlurb project={d} />
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
