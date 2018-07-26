import React, { Component } from "react";

const Line = props => {
  let style = styles.small;
  if (props.full) {
    style = styles.full;
  }
  //hooked with login
  return (
    <div style={props.style}>
      <div style={style} />
    </div>
  );
};

const styles = {
  small: {
    borderBottom: "1px solid white",
    width: "50%",
    margin: "auto",
    display: "flex"
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
