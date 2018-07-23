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
        <Route exact path="/" component={Home} />
        <Route path="/project/:projectId" component={Project} />
        <Route path="/create-project" component={CreateProject} />
        <Route path="/preview-project/:draftId" component={Project} />
        <Route path="/update-project/:projectId" component={CreateProject} />
      </div>
    </Router>
  );
};

export default Routing;
