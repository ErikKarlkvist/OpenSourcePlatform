import React, { Component } from "react";
import logo from "../logo.svg";
import "../resources/Main.css";
import { getProject } from "../backend/projects";
import LoginRegister from "../components/LoginRegister";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import Spinner from "../components/Spinner"
import ProjectHeader from "../components/ProjectHeader"

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
        <ProjectHeader name={this.state.project.name} headerImageURL={this.state.project.headerImageURL}/>
        <div class="Content">

        </div>
        <Spinner loading = {this.state.loading} fillPage={true}/>
      </div>
    );
  }
}

export default withRouter(ProjectPage);
