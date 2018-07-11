import React, { Component } from "react";
import "./ProjectInfo.css";
import Tools from "./Tools.js";
import "../resources/Main.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { requestJoinProject, removeRequestProject } from "../backend/projects";
import firebase from "../backend/firebase";
import Contributors from "./Contributors";

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
      <div style={styles.InfoContainer} class="row">
        {this.state.displayLogin && (
          <LoginForm hide={this.hide} switchDisplay={this.switchDisplay} />
        )}
        {this.state.displaySignup && (
          <SignupForm hide={this.hide} switchDisplay={this.switchDisplay} />
        )}
        <div style={styles.Description} class="col-md-9 col-sm-12 col-lg-9">
          <h3 style={{ textAlign: "left" }}>Description</h3>
          <p style={styles.descriptionText}>{this.props.project.description}</p>
          <Contributors developers={this.props.project.owners} />
        </div>
        <div style={styles.Sidebar} class="col-md-2 col-sm-12 col-lg-2">
          <div class="row">
            {/*Join project button*/}
            <div
              class="col-md-12 col-sm-6 col-lg-12"
              style={{ marginBottom: "20px" }}
            >
              <button className="SeeThroughBtn" onClick={this.joinProject}>
                <h6>{joinText}</h6>
              </button>
            </div>

            {/*Contact*/}
            <div
              class="col-md-12 col-sm-6 col-lg-12"
              style={{ marginBottom: "20px" }}
            >
              <div className="Contact">
                <h6 style={{ marginTop: "10px" }}>Contact</h6>
                <a href={"mailto:" + "xyz@dnb.no"}>
                  <h3 style={styles.Email}>xyz.dnb.no</h3>
                </a>
                {/*replace with this.props.project.contactMail when that is implemented*/}
              </div>
            </div>

            {/*Tools*/}
            <div class="col-md-12 col-sm-12 col-lg-12">
              <Tools tools={this.props.project.tools} />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
    fontSize: 18,
    paddingBottom: "20px",
    textAlign: "left"
  },
  InfoContainer: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-between"
  },
  Sidebar: {
    color: "white",
    alignItems: "right"
  },
  Email: {
    textDecoration: "underline",
    textAlign: "center",
    fontSize: "14px"
  },
  Contact: {
    border: "solid var(--white-two) 1px",
    textAlign: "center",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  descriptionText: {
    color: "white",
    fontSize: "16px"
  }
};
