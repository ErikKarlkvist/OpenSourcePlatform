import React, { Component } from "react";
import ProjectBlurb from "./ProjectBlurb";
import "../resources/Main.css";
import LoginRegister from "../components/LoginRegister"
import logo from "../logo.svg";

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
              <img src={logo} class="Logo" alt="logo" />
              <LoginRegister />
            </header>
              <h2 style={{marginTop: 20}}>{this.props.name}</h2>
              <h3 style={{marginTop: 80}}>Creator: {this.props.creatorName}</h3>
          </div>


      </div>
    );
  }
}

const styles = {
  HeaderContainer: {
    position: "relative",
    width: "100%",
    height: "50vh",
    backgroundColor: "#00343e"
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
