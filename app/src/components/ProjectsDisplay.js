import React, { Component } from "react";

class ProjectsDisplay extends Component {
  render() {
    const data = this.props.projects;
    const listItems = data.map(d => <li key={d.name}>{d.name}</li>);
    return <div>{listItems}</div>;
  }
}
export default ProjectsDisplay;
