import React, { Component } from "react";
import { Image } from "react-bootstrap";

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
        <Image
          responsive
          style={styles.BackgroundImage}
          src="https://firebasestorage.googleapis.com/v0/b/opensourceplatformtesting.appspot.com/o/KB6iqfWRNQNIKYuTxeQ5%2Fdnb.png?alt=media&token=c393a52d-7785-44c3-bc3b-56115939ecc5"
        />
        {this.state.text}
      </div>
    );
  }
}

export default ProjectBlurb;

const styles = {
  Rectangle: {
    //justifyContent: "center",
    //alignItems: "center",
    width: "auto",
    height: "100%",
    border: "solid 3px #ffffff",
    backgroundColor: "grey"
  },
  BackgroundImage: {
    backgroundSize: "cover"
  },
  ProjectName: {
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "white",
    fontSize: "24px",
    fontFamiliy: "FedraSans"
  }
};
