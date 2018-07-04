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
          <div>
            <img
              style={styles.BackgroundImage}
              src="https://firebasestorage.googleapis.com/v0/b/opensourceplatformtesting.appspot.com/o/KB6iqfWRNQNIKYuTxeQ5%2Fdnb.png?alt=media&token=c393a52d-7785-44c3-bc3b-56115939ecc5"
            />
            <span style={styles.ProjectName}>{this.props.project.name}</span>
          </div>
        )}

        {this.state.isHovering && <div>{this.props.project.description}</div>}
      </div>
    );
  }
}

export default ProjectBlurb;

const styles = {
  Rectangle: {
    position: "relative",
    width: "200px",
    height: "200px", //Temporary until height is set in parent
    border: "solid 3px #ffffff",
    backgroundColor: "grey"
  },
  BackgroundImage: {
    position: "relative",
    width: "100%",
    height: "95%"
  },
  ProjectName: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "24px",
    fontFamiliy: "FedraSans"
  }
};
