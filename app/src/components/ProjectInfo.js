import React, { Component } from "react";
import "./ProjectInfo.css";
import Tools from "./Tools.js";
import "../resources/Main.css"
import LoginForm from "./LoginForm"
import {requestJoinProject} from "../backend/projects"
import firebase from "../backend/firebase"

class ProjectInfo extends Component {

  //"joinStatus === joined, requested or none"
  state = {
    displayLogin: false,
    joinStatus: "none"
  }

  componentDidMount(){
    if(this.props.project.requestJoin && this.props.project.requestJoin.contains(this.props.user.id)){
      this.setState({
        joinStatus: "requested"
      })
    }
  }

  joinProject = () => {
    if(this.props.isLoggedIn && this.state.joinStatus === "none"){
      requestJoinProject(this.props.project).then(() => {
        this.setState({joinStatus: "requested"})
      })
    } else {
      requestJoinProject(this.props.project).then(() => {
        this.setState({joinStatus: "requested"})
      })
      //this.setState({displayLogin: true})
    }
  }

  hide = () => {
    this.setState({
      displaySignup: false,
      displayLogin: false,
    })
  }

  render() {

    let joinText = "Join Project"
    if(this.state.joinStatus === "requested"){
      joinText = "Remove request"
    } else if (this.state.joinStatus === "joined"){
      joinText = "Leave project"
    }

    return (
      <div style={styles.InfoContainer} class="row">
        {this.state.displayLogin && <LoginForm hide = {this.hide}/>}
        <div style={styles.Description} class="col-md-9 col-sm-12 col-lg-9">
          {this.props.project.description}
        </div>
        <div style={styles.Sidebar} class="col-md-2 col-sm-12 col-lg-2">
          <div class="row">
            {/*Join project button*/}
            <div
              class="col-md-12 col-sm-6 col-lg-12"
              style={{ marginBottom: "20px" }}
            >
              <button
                className="SeeThroughBtn"
                onClick={this.joinProject}
              >
                <h6>{joinText}</h6>
              </button>
            </div>

            {/*Contact*/}
            <div
              class="col-md-12 col-sm-6 col-lg-12"
              style={{ marginBottom: "20px" }}
            >
              <div className="Contact">
                <h6>Contact</h6>
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
}

export default ProjectInfo;

const styles = {
  Description: {
    color: "white",
    fontSize: 18,
    paddingBottom: "20px"
  },
  InfoContainer: {
    paddingLeft: "5%",
    fontSize: 30,
    marginRight: "0px",
    paddingTop: "20px",
    paddingBottom: "20px"
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
  }
};
