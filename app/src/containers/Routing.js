import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Home from "./pages/HomePage";
import Project from "./pages/ProjectPage";
import CreateProject from "./pages/CreateProjectPage";
import YourProjectsPage from "./pages/YourProjectsPage";
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserPage";

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
        <Route path="/your-projects/" component={YourProjectsPage} />
        <Route path="/about/" component={AboutPage} />
        <Route path="/user/:userId" component={UserPage} />
      </div>
    </Router>
  );
};

export default Routing;
