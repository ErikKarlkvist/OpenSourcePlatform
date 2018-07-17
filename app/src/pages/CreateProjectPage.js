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
import UploadImage from "../components/common/UploadImage";
import "../resources/Input.css";
import Form from "../components/createProjectPage/Form";

const AddTitle = props => {
  return (
    <div>
      <input
        type="text"
        name="projectName"
        placeholder="Add Project Title"
        className="Title"
        value={props.description}
        onChange={e => props.handleInputChange(e)}
      />
    </div>
  );
};

const Description = props => {
  return (
    <div>
      <textarea
        type="text"
        name="description"
        color="white"
        placeholder="Add descriptive text for your project. Max 200 characters."
        className="Description"
        value={props.description}
        onChange={e => props.handleInputChange(e)}
      />
    </div>
  );
};

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
      this.setState({ projectID: id });
    });
  }

  addOwner = userID => {
    console.log(this.state.owners);
    const newOwners = this.state.owners.concat([userID]);
    console.log(newOwners);
    this.setState({ owners: newOwners });
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
              <AddTitle
                projectName={this.state.name}
                handleInputChange={this.handleInputChange}
              />
              <Description
                description={this.state.description}
                handleInputChange={this.handleInputChange}
              />

              <Form
                values={this.state}
                handleInputChange={this.handleInputChange}
                addOwner={this.addOwner}
                removeOwner={this.removeOwner}
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
