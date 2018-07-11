import React, { Component } from "react";
import { Image } from "react-bootstrap";
import "./ProjectBlurb.css";
import "../resources/colors.css";
import ThumbnailHeads from "./ThumbnailHeads";

/*
* Displays the name and thumbnail image of a project
* On hover, the description of the project is shown
* On click, opens the ProjectPage. This is handled in ProjectDisplay.js
*/
class ProjectBlurb extends Component {
  constructor() {
    super();
    this.state = {
      isHovering: false,
      project: {}
    };
  }
  componentDidMount() {
    this.setState({ project: this.props.project });
  }
  onMouseOver(e) {
    this.setState({ isHovering: true });
  }

  onMouseOut(e) {
    this.setState({ isHovering: false });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.project !== nextProps.project) {
      this.setState({ text: nextProps.project.name });
    }
  }

  render() {
    if (this.props.project === undefined) {
      return <div />;
    }
    return (
      <div
        class="ProjectCard"
        style={styles.Rectangle}
        onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)}
      >
        <img style={styles.BackgroundImage} src={this.props.project.imgURL} />

        {!this.state.isHovering && (
          <div>
            <span style={styles.ProjectName}>{this.props.project.name}</span>
            <div style={styles.ThumbnailHeads}>
              <ThumbnailHeads owners={this.props.project.owners} />
            </div>
          </div>
        )}
        {this.state.isHovering && (
          <div className={"description"}>
            <h4 className={"descText"}>{this.props.project.name}</h4>
            <p className={"descText"}>{this.props.project.description}</p>
            <p style={styles.BottomText}>Read More</p>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectBlurb;

const styles = {
  Rectangle: {
    position: "relative",
    border: "solid 3px #ffffff",
    backgroundColor: "rgba(0, 52, 62, 1)",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, .5)"
  },
  BackgroundImage: {
    position: "relative",
    opacity: 0.5,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  ProjectName: {
    //Centers the text above the image
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",

    color: "white",
    fontSize: "34px",
    fontFamiliy: "FedraSans"
  },
  BottomText: {
    textAlign: "right",
    position: "absolute",
    right: "5%",
    bottom: 0
  },
  ThumbnailHeads: {
    position: "absolute",
    right: "5%",
    bottom: "2px"
  }
};
