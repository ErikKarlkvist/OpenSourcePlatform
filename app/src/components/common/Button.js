import React from "react";
import "../../resources/Main.css";

const Button = props => {
  let cName = "SeeThroughBtn";
  //add more if other styles
  if (props.seeThrough) {
    cName = "SeeThroughBtn";
  } else if (props.logIn) {
    cName = "LogInBtn";
  } else if (props.solidBtn) {
    cName = "SolidBtn";
  }

  return (
    <div>
      <button style={props.style} onClick={props.onClick} className={cName}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
