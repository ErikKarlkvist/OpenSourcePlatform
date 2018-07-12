import React, { Component } from "react";
import "./ProjectInfo.css";
import Tools from "./Tools.js";
import "../resources/Main.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { requestJoinProject, removeRequestProject } from "../backend/projects";
import firebase from "../backend/firebase";
import Contributors from "./Contributors";
import "../resources/fonts.css";

class ProjectInfo extends Component {
  //"joinStatus === joined, requested or none"
  state = {
    displayLogin: false,
    joinStatus: "none"
  };

  componentDidMount() {
    if (
      this.props.project.joinRequest &&
      this.props.project.joinRequest.includes(this.props.user.id)
    ) {
      this.setState({
        joinStatus: "requested"
      });
    }
  }

  componentWillReceiveProps(props) {
    if (
      props.project.joinRequest &&
      props.project.joinRequest.includes(props.user.id)
    ) {
      this.setState({
        joinStatus: "requested"
      });
    }
  }

  joinProject = () => {
    if (this.props.isLoggedIn && this.state.joinStatus === "none") {
      requestJoinProject(this.props.project).then(() => {
        this.setState({ joinStatus: "requested" });
      });
    } else if (this.state.joinStatus === "requested") {
      removeRequestProject(this.props.project).then(() => {
        this.setState({ joinStatus: "none" });
      });
    } else if (!this.props.isLoggedIn) {
      this.setState({ displaySignup: true });
    }
  };

  hide = () => {
    this.setState({
      displaySignup: false,
      displayLogin: false
    });
  };

  render() {
    let joinText = "Join Project";
    if (this.state.joinStatus === "requested") {
      joinText = "Remove request";
    } else if (this.state.joinStatus === "joined") {
      joinText = "Leave project";
    }

    return (
      <div style={styles.InfoContainer}>
        {/*Login and signup modals, hidden until prompted */}
        {this.state.displayLogin && (
          <LoginForm hide={this.hide} switchDisplay={this.switchDisplay} />
        )}
        {this.state.displaySignup && (
          <SignupForm hide={this.hide} switchDisplay={this.switchDisplay} />
        )}
        <div class="container" style={styles.Container}>
          <h1 style={{ textAlign: "left" }}>{this.props.project.name}</h1>
          <div class="row" style={styles.TopRow}>
            {/*Project info top part: Description, Seeking, Image*/}
            <div
              style={styles.Description}
              className="col-md-6 col-sm-12 col-lg-6"
            >
              <p style={styles.Description}>{this.props.project.description}</p>
              <h3 style={styles.HeaderText}>Seeking</h3>
              <p style={styles.Description}>
                This is where I'd put my Seeking component, IF I HAD ONE
              </p>
            </div>
            <div class="col-md-6 col-sm-12 col-lg-6">
              <img
                src={this.props.project.headerImageURL}
                style={styles.MainImage}
              />
            </div>
          </div>

          {/*Project info bottom part: Owners, Metrics*/}
          <div class="row" style={styles.BottomRow}>
            <div class="col-md-6 col-sm-12 col-lg-6">
              <Contributors developers={this.props.project.owners} />
            </div>
            <div class="col-md-6 col-sm-12 col-lg-6">
              <h3 style={styles.HeaderText}>Metrics</h3>
              <p style={styles.Description}>
                {"This is where I'd put my Metrics component, IF I HAD ONE"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  mailContact = () => {
    window.location = "mailto:xyz.dnb.no";
  };

  switchDisplay = () => {
    if (this.state.displaySignup) {
      this.setState({
        displaySignup: false,
        displayLogin: true
      });
    } else {
      this.setState({
        displaySignup: true,
        displayLogin: false
      });
    }
  };

  hide = () => {
    this.setState({
      displaySignup: false,
      displayLogin: false
    });
  };
}

export default ProjectInfo;

const styles = {
  Description: {
    color: "white",
    fontSize: 16,
    textAlign: "left"
  },
  TopRow: {
    borderTop: "1px solid var(--dark-teal)",
    width: "100%",
    height: "30vh"
  },
  BottomRow: {
    borderBottom: "1px solid var(--dark-teal)",
    width: "100%",
    paddingTop: "20px"
  },
  InfoContainer: {
    marginTop: "40px"
  },
  Sidebar: {
    color: "white",
    alignItems: "right"
  },
  MainImage: {
    width: "100%",
    height: "auto",
    objectFit: "scale-down",
    boxShadow: "1px 1px 1px 1px black"
  },
  HeaderText: {
    textAlign: "left"
  },
  Container: {
    paddingRight: "0px",
    paddingLeft: "0px",
    height: "70vh",
    alignContent: "space-between"
  }
};
