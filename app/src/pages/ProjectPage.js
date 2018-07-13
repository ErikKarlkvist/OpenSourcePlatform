import React, { Component } from "react";
import firebase from "../backend/firebase";
import "../resources/Main.css";
import { getUser } from "../backend/users.js";
import { getProject } from "../backend/projects";
import LoginRegister from "../components/LoginRegister";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Spinner from "../components/common/Spinner";
import ProjectInfo from "../components/ProjectInfo";
import ProjectHeader from "../components/ProjectHeader";
import Readme from "../components/Readme";
import Updates from "../components/Updates";
import Line from "../components/common/Line";
import logo from "../logo.svg";

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
      <div className="PageContainer">
        {!this.state.loading && (
          <div class="Content">
            <header className="App-header">
              <Link to="/">
                <img src={logo} class="Logo" alt="logo" />
              </Link>
              <LoginRegister
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                hasFetchedUser={this.state.hasFetchedUser}
              />
            </header>
            <div class="Center">
              <ProjectInfo
                user={this.state.user}
                isLoggedIn={this.state.isLoggedIn}
                project={this.state.project}
              />
              <Line full={true} />
              <Updates project={this.state.project} />
              <Line full={true} />
              <Readme project={this.state.project} />
            </div>
          </div>
        )}
        <Spinner loading={this.state.loading} fillPage={true} />
      </div>
    );
  }
}

export default withRouter(ProjectPage);
