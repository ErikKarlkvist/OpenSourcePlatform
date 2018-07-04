import React, { Component } from "react";

class ProjectBlurb extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }
  onMouseOver(e) {
    this.setState({ text: this.props.project.description });
  }

  onMouseOut(e) {
    this.setState({ text: this.props.project.name });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.project !== nextProps.project) {
      this.setState({ text: nextProps.project.name });
    }
  }

  render() {
    return (
      <div
        style={styles.Rectangle}
        onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)}
      >
        <div style={styles.ProjectName}>{this.state.text}</div>
      </div>
    );
  }
}

export default ProjectBlurb;

const styles = {
  Rectangle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    border: "solid 3px #ffffff",
    backgroundColor: "grey"
  },
  ProjectName: {
    color: "white",
    fontSize: "24px",
    fontFamiliy: "FedraSans"
  }
};
