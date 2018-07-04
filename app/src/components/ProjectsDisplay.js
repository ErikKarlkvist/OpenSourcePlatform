import React, { Component } from "react";
import ProjectBlurb from "./ProjectBlurb";

class ProjectsDisplay extends Component {
  render() {
    const data = this.props.projects;

    const items = data.map(d => (
      <div class="col-4">
        <ProjectBlurb project={d} />
      </div>
    ));

    return (
      <div class="container">
        <div class="row">{items}</div>
      </div>
    );
  }
}
export default ProjectsDisplay;
