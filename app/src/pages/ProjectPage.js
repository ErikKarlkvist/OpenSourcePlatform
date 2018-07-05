import React, { Component } from "react";
import logo from "../logo.svg";
import "./Main.css";
import { getProject } from "../backend/projects";
import LoginRegister from "../components/LoginRegister";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";
import ProjectInfo from "../components/ProjectInfo";
import ProjectHeader from "../components/ProjectHeader";

class ProjectPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loading: true,
      project: {}
    };
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params.projectId) {
      getProject(this.props.match.params.projectId).then(project => {
        this.setState({
          loading: false,
          project
        });
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div class="PageContainer">
        <header className="App-header" />
        <div class="Content">
          <h1>{this.state.project.name}</h1>
        </div>
        <Spinner loading={this.state.loading} fillPage={true} />
        <ProjectInfo project={this.state.project} />
      </div>
    );
  }
}

export default withRouter(ProjectPage);
