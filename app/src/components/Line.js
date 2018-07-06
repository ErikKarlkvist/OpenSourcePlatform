import React, { Component } from "react";

class Line extends Component {
  render() {
    //hooked with login
    return (
      <div style={this.props.style}>
        <div style={styles.line} />
      </div>
    );
  }
}

const styles = {
  line: {
    borderBottom: "1px solid white",
    width: "50%",
    margin: "auto",
    display: "flex"
  }
};
export default Line;
