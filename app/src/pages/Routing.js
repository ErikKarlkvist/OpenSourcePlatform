import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./HomePage";
import Project from "./ProjectPage";
import HenningsPage from "./HenningsPage";

const Routing = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/project/:projectId" component={Project} />
    </div>
  </Router>
);

export default Routing;
