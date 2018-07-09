import React, { Component } from "react";
import ProjectBlurb from "./ProjectBlurb";
import "../resources/Main.css";
import LoginRegister from "../components/LoginRegister"
import logo from "../logo.svg";
import Contributors from "./Contributors"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ProjectsDisplay extends Component {
  constructor(props){
    super(props);

  }

  render() {

    return (
      <div style={styles.HeaderContainer}>

          <img style={styles.HeaderImage} src={this.props.headerImageURL}/>

          <div style={styles.HeaderContent}>
            <header class = "App-header">
              <Link to="/">
                <img src={logo} class="Logo" alt="logo" />
              </Link>
              <LoginRegister isLoggedIn={this.props.isLoggedIn} user={this.props.user} hasFetchedUser={this.props.hasFetchedUser}/>
            </header>
            <div>
              <h2 style={{marginTop: 80}}>{this.props.name}</h2>
              <Contributors developers = {this.props.developers} />
            </div>
          </div>


      </div>
    );
  }
}

const styles = {
  HeaderContainer: {
    position: "relative",
    width: "100%",
    height: "70vh",
    backgroundColor: "#00343e",
  },
  HeaderImage: {
    position: "relative",
    width: "100%",
    height: "100%",
    opacity: 0.4
  },
  HeaderContent: {
    //Centers the text above the image
    position: "absolute",
    width: "100%",
    left: "0",
    top: "0",
    textAlign: "center"
  },
};

export default ProjectsDisplay;
