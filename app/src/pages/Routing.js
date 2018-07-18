import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./HomePage";
import Project from "./ProjectPage";
import CreateProject from "./CreateProjectPage";

const Routing = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/project/:projectId" component={Project} />
      <Route path="/createProject" component={CreateProject} />
    </div>
  </Router>
);

export default Routing;
