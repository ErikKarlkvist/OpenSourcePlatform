import React, { Component } from "react";
import { Image } from "react-bootstrap";

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
        style={styles.Rectangle}
        onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)}
      >
        <img style={styles.BackgroundImage} src={this.props.project.imgURL} />

        {!this.state.isHovering && (
          <span style={styles.ProjectName}>{this.props.project.name}</span>
        )}
        {this.state.isHovering && (
          <div style={styles.Description}>
            <h2 style={{ color: "black" }}>{this.props.project.name}</h2>
            <p> {this.props.project.description} </p>
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
    width: "100%",
    height: "100%",
    border: "solid 3px #ffffff",
    backgroundColor: "black",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, .5)"
  },
  BackgroundImage: {
    position: "relative",
    opacity: 0.5,
    width: "100%",
    height: "100%"
  },
  ProjectName: {
    //Centers the text above the image
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",

    color: "white",
    fontSize: "34px",
    fontFamiliy: "FedraSans",
    textShadow: "2px 2px 4px #000000"
  },
  Description: {
    position: "absolute",
    top: "5%",
    left: "5%",
    backgroundColor: "white",
    color: "black",
    height: "90%",
    width: "90%",
    marginTop: "2%",
    textAlign: "left",
    wordWrap: "break-word"
  }
};
