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
        {!this.state.isHovering && (
          <div style={{ height: "100%" }}>
            <img
              style={styles.BackgroundImage}
              src={this.props.project.imgURL}
            />
            <span style={styles.ProjectName}>{this.props.project.name}</span>
          </div>
        )}

        {this.state.isHovering && (
          <div style={styles.Description}>
            <h2>{this.props.project.name}</h2>
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
    width: "300",
    height: "300px", //Temporary until height is set in parent
    border: "solid 3px #ffffff",
    backgroundColor: "black"
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
    fontSize: "24px",
    fontFamiliy: "FedraSans"
  },
  Description: {
    backgroundColor: "white",
    color: "black",
    height: "95%",
    marginTop: "2%"
  }
};
