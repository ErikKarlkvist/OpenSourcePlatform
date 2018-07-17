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
import Form from "../components/createProjectPage/Form";
import InputTextBox from "../components/createProjectPage/InputTextBox";

class CreateProjectPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      hasFetchedUser: false,
      user: {},
      projectID: "",
      projectName: "",
      description: "",
      lookingFor: "",
      gitURL: "",
      readmeURL: "",
      contactMail: "",
      headerImageURL: "",
      owners: []
    };
  }
  componentDidMount() {
    this.setupAuthStateChange();
    createNewProjectID().then(id => {
      console.log(id);
      this.setState({ projectID: id });
    });
  }

  handleInputChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
    setTimeout(() => {
      console.log(this.state, true && this.state.headerImage);
    }, 500);
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
    console.log(url);
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
      owners: [{ userID: this.state.user.id, role: "Creator" }]
    });
  };

  render() {
    return (
      <div className="PageContainer">
        <Spinner loading={!this.state.hasFetchedUser} fillPage={true} />
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
              <h1>Create Project</h1>
              <Form
                values={this.state}
                handleInputChange={this.handleInputChange}
                recieveURL={this.recieveURL}
              />
              <Button onClick={this.submitProject}>Submit(N/A)</Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CreateProjectPage;
