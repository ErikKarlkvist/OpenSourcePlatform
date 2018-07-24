import React, { Component } from "react";
import "../../resources/Styles/AnimatedMenu.css";

const FilterProjects = props => {
  let liveStyle = "";
  let allStyle = "";
  let graduateStyle = "";

  if (props.picked === "all") {
    liveStyle = "MenuItem";
    allStyle = "MenuItem UnderlinedMenuItem";
    graduateStyle = "MenuItem";
  } else if (props.picked === "live") {
    liveStyle = "MenuItem UnderlinedMenuItem";
    allStyle = "MenuItem";
    graduateStyle = "MenuItem";
  } else {
    liveStyle = "MenuItem";
    allStyle = "MenuItem";
    graduateStyle = "MenuItem UnderlinedMenuItem";
  }

  return (
    <div className="Menu">
      <a
        className={allStyle}
        href="#"
        onClick={() => props.changeFilter("all")}
      >
        All Projects
      </a>
      <a
        className={liveStyle}
        href="#"
        onClick={() => props.changeFilter("live")}
      >
        Live Projects
      </a>
      <a
        className={graduateStyle}
        href="#"
        onClick={() => props.changeFilter("graduate")}
      >
        Graduated Projects
      </a>
    </div>
  );
};
export default FilterProjects;
