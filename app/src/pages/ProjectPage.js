import React, { Component } from "react";
import firebase from "../backend/firebase";
import "../resources/Main.css";
import { getUser } from "../backend/users.js";
import { getProject } from "../backend/projects";
import LoginRegister from "../components/LoginRegister";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";
import ProjectInfo from "../components/ProjectInfo";
import ProjectHeader from "../components/ProjectHeader";
import Readme from "../components/Readme";
import CurrentState from "../components/CurrentState";

class ProjectPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      //add creator in order to not crash during load
      project: {
        creator: {}
      },
      user: {},
      isLoggedIn: false,
      hasFetchedUser: false
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

    this.setupAuthStateChange();
  }

  setupAuthStateChange() {
    const page = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        getUser(user.uid).then(user => {
          page.setState({
            isLoggedIn: true,
            hasFetchedUser: true,
            user
          });
        });
      } else {
        page.setState({
          isLoggedIn: false,
          hasFetchedUser: true
        });
      }
    });
  }

  render() {
    return (
      <div class="PageContainer">
        {!this.state.loading && (
          <div>
            <ProjectHeader
              name={this.state.project.name}
              headerImageURL={this.state.project.headerImageURL}
              developers={this.state.project.developers}
              isLoggedIn={this.state.isLoggedIn}
              user={this.state.user}
              hasFetchedUser={this.state.hasFetchedUser}
            />
            <ProjectInfo project={this.state.project} />
            <CurrentState project={this.state.project} />
            <ProjectInfo
              user={this.state.user}
              isLoggedIn={this.state.isLoggedIn}
              project={this.state.project}
            />
            <Readme project={this.state.project} />
          </div>
        )}
        <Spinner loading={this.state.loading} fillPage={true} />
      </div>
    );
  }
}

export default withRouter(ProjectPage);
