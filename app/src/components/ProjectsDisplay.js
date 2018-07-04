import React, { Component } from "react";

class ProjectsDisplay extends Component {
  render() {
    const data = this.props.projects;

    const items = data.map(d =>
      <div class="col-4">
        {d.name}
      </div>
    );

    return (
      <div class="container">
        <div class="row">
          {items}
        </div>
      </div>
    );
  }
}
export default ProjectsDisplay;
