import React from "react";

const Button = props => {
  let cName = "SeeThroughBtn";
  //add more if other styles
  if (props.seeThrough) {
    cName = "SeeThroughBtn";
  }

  if (props.logIn) {
    cName = "LogInBtn";
  }

  if (props.solidBtn) {
    cName = "SolidBtn";
  }

  if (props.warning) {
    cName = "WarningBtn";
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
