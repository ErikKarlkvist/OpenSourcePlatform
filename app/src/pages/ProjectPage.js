import React, { Component } from "react";
import firebase from "../backend/firebase";
import "../resources/Main.css";
import { getUser } from "../backend/users.js";
import { getProject } from "../backend/projects";
import LoginRegister from "../components/common/LoginRegister";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Spinner from "../components/common/Spinner";
import ProjectInfo from "../components/projectPage/ProjectInfo";
import Readme from "../components/projectPage/Readme";
import Updates from "../components/projectPage/Updates";
import Line from "../components/common/Line";
import logo from "../logo.svg";
import FixedBackgroundImage from "../components/common/FixedBackgroundImage";
import { getProjectFromDraft } from "../backend/projectDrafts";

const ProjectNotFound = props => {
  return (
    <div className="PageContainer">
      <div className="Center">
        <h1 style={{ marginTop: "100px" }}>Project not found</h1>
      </div>
    </div>
  );
};

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
      hasFetchedUser: false,
      foundProject: false
    };
  }

  componentDidMount() {
    console.log(this.props.match);
    if (this.props.match && this.props.match.params.projectId) {
      this.loadLiveProject();
    } else if (this.props.match && this.props.match.params.draftId) {
      this.loadDraftProject();
    } else {
      this.setState({
        loading: false,
        foundProject: false
      });
    }

    this.setupAuthStateChange();
  }

  loadDraftProject() {
    getProjectFromDraft(this.props.match.params.draftId)
      .then(project => {
        this.setState({
          loading: false,
          foundProject: true,
          project
        });
      })
      .catch(e => {
        console.error(e);
        this.setState({
          loading: false,
          foundProject: false
        });
      });
  }

  loadLiveProject() {
    getProject(this.props.match.params.projectId).then(project => {
      if (project) {
        this.setState({
          loading: false,
          project,
          foundProject: true
        });
      } else {
        this.setState({
          loading: false,
          foundProject: false
        });
      }
    });
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
    if (!this.state.loading) {
      return (
        <div className="PageContainer">
          <div className="Content">
            <FixedBackgroundImage
              headerImageURL={this.state.project.headerImageURL}
            />
            <header className="App-header">
              <Link to="/">
                <img src={logo} className="Logo" alt="logo" />
              </Link>
              <LoginRegister
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                hasFetchedUser={this.state.hasFetchedUser}
              />
            </header>
            {this.state.foundProject && (
              <div>
                <div className="Center">
                  <ProjectInfo
                    user={this.state.user}
                    isLoggedIn={this.state.isLoggedIn}
                    project={this.state.project}
                  />
                </div>
                <Line full={true} />
                <Updates project={this.state.project} />
                <Line full={true} />
                <div className="Center">
                  <Readme project={this.state.project} />
                </div>
              </div>
            )}
            {!this.state.foundProject && <ProjectNotFound state={this.state} />}
          </div>
        </div>
      );
    } else {
      return <Spinner loading={this.state.loading} fillPage={true} />;
    }
  }
}

export default withRouter(ProjectPage);
