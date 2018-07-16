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

const Form = props => {
  const styles = {
    inputTextBox: {
      width: "100%",
      border: "3px dotted grey",
      backgroundColor: "rgba(1, 1, 1, 0)",
      color: "white",
      height: "40px",
      marginBottom: "20px",
      paddingLeft: "12px",
      boxSizing: "border-box",
      borderRadius: "4px"
    }
  };

  return (
    <div>
      <div>
        Project Name
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          style={styles.inputTextBox}
          value={props.values.projectName}
          onChange={e => props.handleInputChange(e)}
        />
      </div>
      <div>
        Description
        <input
          type="text"
          name="description"
          placeholder="Description"
          style={styles.inputTextBox}
          value={props.values.description}
          onChange={e => props.handleInputChange(e)}
        />
      </div>
      <div>
        Looking for
        <input
          type="text"
          name="lookingFor"
          placeholder="Looking for"
          style={styles.inputTextBox}
          value={props.values.lookingFor}
          onChange={e => props.handleInputChange(e)}
        />
      </div>
      {/*}
        <div>
          Current state
          <input type="text" name="currentState" />
        </div>
  */}
      <div>
        Link to GitHub page
        <input
          type="text"
          name="gitURL"
          placeholder="URL of Code Repository"
          style={styles.inputTextBox}
          value={props.values.gitURL}
          onChange={e => props.handleInputChange(e)}
        />
      </div>
      <div>
        Link to Github readme (raw file)
        <input
          type="text"
          name="readmeURL"
          placeholder="URL to raw README.md file"
          style={styles.inputTextBox}
          value={props.values.readmeURL}
          onChange={e => props.handleInputChange(e)}
        />
      </div>
      <div>
        Contact mail
        <input
          type="text"
          name="contactMail"
          placeholder="Your email, so that people can contact you about your project"
          style={styles.inputTextBox}
          value={props.values.contactMail}
          onChange={e => props.handleInputChange(e)}
        />
      </div>
      <UploadImage
        type={"headerImage"}
        id={props.projectID}
        recieveURL={props.recieveURL}
      />
      {props.values.headerImageURL !== "" && (
        <div>
          <img src={props.values.headerImageURL} />
        </div>
      )}
      <div>
        Owners
        <input type="text" name="owners" />
      </div>
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

        <div class="Content">
          <div class="Center">
            <h1>Create Project</h1>
            <Form
              values={this.state}
              handleInputChange={this.handleInputChange}
              recieveURL={this.recieveURL}
            />
            <Button onClick={this.submitProject}>Submit(N/A)</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProjectPage;
