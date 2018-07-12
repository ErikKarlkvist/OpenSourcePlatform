import React, { Component } from "react";
import { getFeatureRequestsFromGithub } from "../backend/metrics";

class Line extends Component {
  constructor() {
    super();
    this.state = {
      nmbrOfEts: []
    };
  }

  componentDidMount() {
    getFeatureRequestsFromGithub("https://github.com/browsh-org/browsh")
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
        this.setState({
          nmbrOfEts: "Couldn't fetch"
        });
      });
  }

  render() {
    let style = styles.small;
    if (this.props.full) {
      style = styles.full;
    }
    //hooked with login
    return (
      <div style={this.container}>
        <h1>Metrics</h1>
      </div>
    );
  }
}

const styles = {
  container: {
    width: "100%",
    textAlign: "left"
  },
  full: {
    width: "100%",
    borderBottom: "2px solid white",
    position: "absolute",
    left: 0,
    right: 0
  }
};
export default Line;
