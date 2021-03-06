import React from "react";
import Thumbnail from "../common/Thumbnail";
import { Link } from "react-router-dom";

const ProjectsDisplay = props => {
  const data = props.projects;
  let items = [];
  if (data) {
    items = data.map((d, i) => (
      <div
        style={{ marginBottom: 30 }}
        key={i}
        className="col-md-6 col-sm-12 col-lg-4"
      >
        <Link to={`/project/${d.id}`}>
          <Thumbnail
            renderHeads={true}
            name={d.name}
            owners={d.owners}
            description={d.description}
            imgURL={d.headerImageURL}
            size="medium"
          />
        </Link>
      </div>
    ));
  }

  return <div className="row">{items}</div>;
};

export default ProjectsDisplay;
