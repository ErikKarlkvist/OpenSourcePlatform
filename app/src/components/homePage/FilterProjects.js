import React, { Component } from "react";
import "../../resources/Styles/AnimatedMenu.css";

const FilterProjects = props => {
  let ideas = "";
  let allStyle = "";
  let inProgress = "";

  if (props.picked === "all") {
    ideas = "MenuItem";
    allStyle = "MenuItem UnderlinedMenuItem";
    inProgress = "MenuItem";
  } else if (props.picked === "live") {
    ideas = "MenuItem UnderlinedMenuItem";
    allStyle = "MenuItem";
    inProgress = "MenuItem";
  } else {
    ideas = "MenuItem";
    allStyle = "MenuItem";
    inProgress = "MenuItem UnderlinedMenuItem";
  }

  return (
    <div className="Menu">
      <a
        className={allStyle}
        href="#"
        onClick={() => props.changeFilter("all")}
      >
        All
      </a>
      <a className={ideas} href="#" onClick={() => props.changeFilter("live")}>
        Ideas
      </a>
      <a
        className={inProgress}
        href="#"
        onClick={() => props.changeFilter("graduate")}
      >
        In progress
      </a>
    </div>
  );
};
export default FilterProjects;
