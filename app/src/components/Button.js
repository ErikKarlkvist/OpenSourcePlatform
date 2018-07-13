import React, { Component } from "react";
import "../resources/Main.css";
const Button = props => {
  let cName = "SeeThroughBtn";
  //add more if other styles
  if (props.seeThrough) {
    cName = "SeeThroughBtn";
  }

  return (
    <div>
      <button onClick={props.onClick} className={cName}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
