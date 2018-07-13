import React, { Component } from "react";
import Thumbnail from "./Thumbnail";
import "../resources/Main.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ProjectsDisplay extends Component {
  render() {
    const data = this.props.projects;
    let items = [];
    if (data) {
      items = data.map(d => (
        <div style={{ marginBottom: 30 }} class="col-md-6 col-sm-12 col-lg-4">
          <Link to={`project/${d.id}`}>
            <Thumbnail
              renderHeads={true}
              name={d.name}
              owners={d.owners}
              description={d.description}
              imgURL={d.imgURL}
            />
          </Link>
        </div>
      ));
    }

    return <div class="row">{items}</div>;
  }
}

export default ProjectsDisplay;
