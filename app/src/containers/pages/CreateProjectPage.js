import React, { Component } from "react";
import firebase from "../../backend/firebase";
import { getUser } from "../../backend/users.js";
import { getProject } from "../../backend/projects";
import HeaderMenu from "../common/HeaderMenu";
import { Link } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import logo from "../../logo.svg";
import {
  createNewProject,
  createNewProjectID,
  updateProject
} from "../../backend/projects";
import ProjectInfo from "../create/CreateProjectInfo";
import CreateAttachments from "../create/CreateAttachments";
import ReadmeInput from "../create/ReadmeInput";
import FixedBackgroundImage from "../../components/common/FixedBackgroundImage";
import Line from "../../components/common/Line";
import Button from "../../components/common/Button";
import { saveToLocalDraft } from "../../backend/projectDrafts";
import {
  validateGithubURL,
  validateEmail,
  hasVerifiedEmail
} from "../../backend/validation";
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
  let title = props.update ? "Update project" : "Create project";
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
        {title}
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
      thumbnails: [],
      update: false
    };
  }

  componentDidMount() {
    this.setupAuthStateChange();
    if (this.props.match && this.props.match.params.projectId) {
      this.loadLiveProject();
    } else {
      createNewProjectID().then(id => {
        this.setState({ projectID: id, loading: false });
      });
    }
  }

  loadLiveProject() {
    getProject(this.props.match.params.projectId).then(project => {
      if (project) {
        this.setState({
          loading: false,
          foundProject: true,
          projectID: project.id,
          projectName: project.name,
          description: project.description,
          lookingFor: project.lookingFor,
          gitURL: project.gitURL,
          readmeURL: project.readmeURL,
          contactMail: project.contactMail,
          headerImageURL: project.headerImageURL,
          owners: project.owners,
          thumbnails: project.thumbnails,
          update: true
        });
      } else {
        this.setState({
          loading: false,
          foundProject: false
        });
      }
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
          if (!page.props.match || !page.props.match.params.projectId) {
            const owner = user;
            owner.role = "Creator";
            const owners = [];
            owners.push(owner);

            page.setOwners(owners);
          }
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
      projectID: this.state.projectID
    };
  }

  submitProject = () => {
    hasVerifiedEmail().then(verified => {
      if (!verified) {
        alert(
          "Permission Denied. Your email is not verfied, verify it by clicking on the link you recevied when creating your account. You can generate a new email from your profile."
        );
        return;
      }

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

      const project = this.getProjectFromState();
      this.setState({ loading: true });
      if (this.state.update) {
        updateProject(project, this.state.projectID)
          .then(() => {
            const url = `/project/${this.state.projectID}`;
            this.props.history.push(url);
          })
          .catch(e => {
            this.setState({ loading: false });
            alert(e.message);
          });
      } else {
        createNewProject(project, this.state.projectID)
          .then(() => {
            const url = `/project/${this.state.projectID}`;
            this.props.history.push(url);
          })
          .catch(e => {
            this.setState({ loading: false });
            alert(e.message);
          });
      }
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

  checkUserIsValid() {
    let valid = false;
    //if not - will be kicked from auth state changed
    //this function only check that when current user is defined, the currentUser is an owner
    // when currentUser is not defined (i.e not logged in), the function setupAuthStateChange will kick the user anyway
    // i check these two in the render because both are asynchronously fetched, and I can't check that they match when one might be undefined
    // this makes sure that as soon as both are defined, the check is done
    if (
      this.state.user &&
      this.state.user.uid &&
      this.state.project &&
      !this.state.hasCheckUserIsValid
    ) {
      const owners = this.state.project.owners;
      if (owners) {
        owners.forEach(owner => {
          if (owner.userID === this.state.user.uid) {
            valid = true;
          }
        });
      }

      if (!valid) {
        this.props.history.push("/");
      } else {
        this.setState({
          hasCheckUserIsValid: true
        });
      }
    }
  }

  render() {
    this.checkUserIsValid();
    return (
      <div className="PageContainer">
        {this.state.hasFetchedUser &&
          !this.state.loading && (
            <div className="Content">
              <FixedBackgroundImage
                headerImageURL={this.state.headerImageURL}
              />
              <header className="App-header">
                <Link to="/">
                  <img src={logo} className="Logo" alt="logo" />
                </Link>
                <HeaderMenu
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
                <CreateAttachments
                  projectID={this.state.projectID}
                  setThumbnails={this.setThumbnails}
                  thumbnails={this.state.thumbnails}
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
                  update={this.state.update}
                />
              </div>
            </div>
          )}
        <Spinner
          loading={!this.state.hasFetchedUser || this.state.loading}
          fillPage={true}
        />
      </div>
    );
  }
}

export default withRouter(CreateProjectPage);
