import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";
import Home from "./HomePage";
import Project from "./ProjectPage";
import CreateProject from "./CreateProjectPage";

//For some reason default in routing is not to scroll to top when changeing page
//this forces scroll to top
const ScrollToTop = withRouter(
  class ScrollToTopWithoutRouter extends React.Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0);
      }
    }

    render() {
      return null;
    }
  }
);

const Routing = () => {
  return (
    <Router>
      <div>
        <ScrollToTop />
        <Route exact path="/" component={Home} onChange={handleUpdate} />
        <Route
          path="/project/:projectId"
          component={Project}
          onChange={handleUpdate}
        />
        <Route
          path="/create-project"
          component={CreateProject}
          onChange={handleUpdate}
        />
        <Route
          path="/preview-project/:draftId"
          component={Project}
          onChange={handleUpdate}
        />
      </div>
    </Router>
  );
};

export default Routing;
