import React, { Component } from "react";
import firebase from "../backend/firebase";
import "../resources/Main.css";
import { getUser } from "../backend/users.js";
import LoginRegister from "../components/common/LoginRegister";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import logo from "../logo.svg";
import "../resources/Main.css";
import Button from "../components/common/Button";
import { createNewProject, createNewProjectID } from "../backend/projects";
import "../resources/Input.css";
import Form from "../components/createProjectPage/Form";
import ProjectInfo from "../components/createProjectPage/CreateProjectInfo";
import AddThumbnails from "../components/createProjectPage/AddThumbnails";
import ReadmeInput from "../components/createProjectPage/ReadmeInput";

class CreateProjectPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      hasFetchedUser: false,
      user: {},
      projectID: undefined,
      projectName: "",
      description: "",
      lookingFor: "",
      gitURL: "",
      readmeURL: "",
      contactMail: "",
      headerImageURL: "",
      owners: [],
      loading: true
    };
  }

  componentDidMount() {
    this.setupAuthStateChange();
    createNewProjectID().then(id => {
      this.setState({ projectID: id, loading: false });
    });
  }

  addOwner = userID => {
    this.setState({ owners: this.state.owners.concat([userID]) });
  };

  removeOwner = userID => {
    const newOwners = this.state.owners.filter(item => item !== userID);
    this.setState({ owners: newOwners });
  };

  handleInputChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };

  setupAuthStateChange = () => {
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
  };

  recieveURL = url => {
    this.setState({ headerImageURL: url });
  };

  submitProject = () => {
    createNewProject({
      name: this.state.projectName,
      description: this.state.description,
      lookingFor: [this.state.lookingFor],
      gitURL: this.state.description,
      readmeURL: this.state.readmeURL,
      contactMail: this.state.contactMail,
      creator: this.state.user.id,
      headerImageURL: this.state.headerImageURL,
      owners: this.state.owners
    });
  };

  render() {
    return (
      <div className="PageContainer">
        <Spinner
          loading={!this.state.hasFetchedUser && !this.state.loading}
          fillPage={true}
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
        {this.state.hasFetchedUser && (
          <div className="Content">
            <div className="Center">
              <ProjectInfo
                values={this.state}
                handleInputChange={this.handleInputChange}
              />

              <ReadmeInput
                handleInputChange={this.handleInputChange}
                values={this.state}
              />

              <Form
                values={this.state}
                handleInputChange={this.handleInputChange}
                addOwner={this.addOwner}
                removeOwner={this.removeOwner}
                recieveURL={this.recieveURL}
              />
              {this.state.projectID && (
                <AddThumbnails projectID={this.state.projectID} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CreateProjectPage;
