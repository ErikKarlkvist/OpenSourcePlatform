import React, { Component } from "react";
import firebase from "../backend/firebase";
import { getUser } from "../backend/users.js";
import LoginRegister from "../components/common/LoginRegister";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import logo from "../logo.svg";
import { createNewProject, createNewProjectID } from "../backend/projects";
import ProjectInfo from "../components/createProjectPage/CreateProjectInfo";
import CreateUpdates from "../components/createProjectPage/CreateUpdates";
import ReadmeInput from "../components/createProjectPage/ReadmeInput";
import FixedBackgroundImage from "../components/common/FixedBackgroundImage";
import Line from "../components/common/Line";
import Button from "../components/common/Button";
import { saveToLocalDraft } from "../backend/projectDrafts";
import { validateGithubURL, validateEmail } from "../backend/validation";
import { withRouter } from "react-router";

const Buttons = props => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "flex-end",
      paddingTop: "30px",
      paddingBottom: "30px",
      marginTop: "-10px",
      width: "100%"
    },
    rightButton: {
      marginLeft: "30px"
    },
    leftButton: {}
  };

  return (
    <div style={styles.container}>
      <Button style={styles.leftButton} onClick={props.preview}>
        Preview project
      </Button>
      <Button
        solidBtn={true}
        style={styles.rightButton}
        onClick={props.createProject}
      >
        Create project
      </Button>
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
      projectID: undefined,
      projectName: "",
      description: "",
      lookingFor: [],
      gitURL: "",
      readmeURL: "",
      contactMail: "",
      headerImageURL: "",
      owners: [],
      loading: true,
      thumbnails: []
    };
  }

  componentDidMount() {
    this.setupAuthStateChange();
    createNewProjectID().then(id => {
      this.setState({ projectID: id, loading: false });
    });
  }

  setOwners = owners => {
    this.setState({ owners: owners });
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

          const owner = user;
          owner.role = "Creator";
          const owners = [];
          owners.push(owner);

          page.setOwners(owners);
        });
      } else {
        page.props.history.push("/");
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

  getProjectFromState() {
    let headerImageURL = this.state.headerImageURL;
    let standardImageURLs = [
      "https://firebasestorage.googleapis.com/v0/b/opensourceplatformtesting.appspot.com/o/resources%2Fgreen.png?alt=media&token=8211dd36-6174-4c18-bf07-e954960fdb0f",
      "https://firebasestorage.googleapis.com/v0/b/opensourceplatformtesting.appspot.com/o/resources%2Fpink.jpg?alt=media&token=dcd44594-e7bc-4458-a57f-19a53921cd3a"
    ];

    if (!this.state.headerImageURL) {
      const randInt = Math.floor(
        Math.random() * Math.floor(standardImageURLs.length)
      );
      headerImageURL = [standardImageURLs[randInt]];
    }

    return {
      name: this.state.projectName,
      description: this.state.description,
      lookingFor: this.state.lookingFor,
      gitURL: this.state.gitURL,
      readmeURL: this.state.readmeURL,
      contactMail: this.state.contactMail,
      creator: this.state.user.id,
      headerImageURL,
      owners: this.state.owners,
      thumbnails: this.state.thumbnails,
      projectID: this.state.projectID,
      creator: this.state.user.id
    };
  }

  submitProject = () => {
    console.log(this.state);
    if (!this.state.projectName) {
      alert("Please add a title");
      return;
    }

    if (!this.state.description) {
      alert("Please add a description");
      return;
    }

    if (this.state.owners.length === 0) {
      alert("Please add atleast one owner");
      return;
    }

    if (!validateEmail(this.state.contactMail)) {
      alert("Invalid contact email");
      return;
    }

    if (this.state.gitURL && !validateGithubURL(this.state.gitURL)) {
      alert("Invalid github url, please fix or remove");
      return;
    }

    this.setState({ loading: true });
    const project = this.getProjectFromState();
    createNewProject(this.getProjectFromState(), this.state.projectID)
      .then(() => {
        const url = `/project/${this.state.projectID}`;
        this.props.history.push(url);
      })
      .catch(e => {
        this.setState({ loading: false });
        alert(e.message);
      });
  };

  setThumbnails = thumbnails => {
    this.setState({ thumbnails });
  };

  setSeeking = lookingFor => {
    this.setState({ lookingFor });
  };

  preview = () => {
    const project = this.getProjectFromState();
    saveToLocalDraft(this.state.projectID, project).then(() => {
      const url = `/preview-project/${this.state.projectID}`;
      var win = window.open(url, "_blank");
      win.focus();
    });
  };

  removeHeaderImage = () => {
    this.setState({ headerImageURL: "" });
  };

  render() {
    return (
      <div className="PageContainer">
        {this.state.hasFetchedUser && (
          <div className="Content">
            <FixedBackgroundImage headerImageURL={this.state.headerImageURL} />
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
            <div className="Center">
              <ProjectInfo
                values={this.state}
                handleInputChange={this.handleInputChange}
                setOwners={this.setOwners}
                projectID={this.state.projectID}
                recieveURL={this.recieveURL}
                setSeeking={this.setSeeking}
                removeHeaderImage={this.removeHeaderImage}
              />
            </div>
            {this.state.projectID && (
              <CreateUpdates
                projectID={this.state.projectID}
                setThumbnails={this.setThumbnails}
              />
            )}
            <Line full={true} />
            <div className="Center">
              <ReadmeInput
                handleInputChange={this.handleInputChange}
                values={this.state}
              />
              <Buttons
                preview={this.preview}
                createProject={this.submitProject}
              />
            </div>
          </div>
        )}
        <Spinner
          loading={!this.state.hasFetchedUser && !this.state.loading}
          fillPage={true}
        />
      </div>
    );
  }
}

export default withRouter(CreateProjectPage);
