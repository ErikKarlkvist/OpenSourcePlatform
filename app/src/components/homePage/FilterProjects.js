import React, { Component } from "react";
import "../common/AnimatedMenu.css";

class FilterProjects extends Component {
  constructor() {
    super();
    //picked is either "all" "live" or "graduate"
    this.state = {
      picked: "all"
    };
  }

  render() {
    let liveStyle = "";
    let allStyle = "";
    let graduateStyle = "";

    if (this.state.picked === "all") {
      liveStyle = "MenuItem";
      allStyle = "MenuItem UnderlinedMenuItem";
      graduateStyle = "MenuItem";
    } else if (this.state.picked === "live") {
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
        <a className={allStyle} href="#" onClick={() => this.setStyle("all")}>
          All Projects
        </a>
        <a className={liveStyle} href="#" onClick={() => this.setStyle("live")}>
          Live Projects
        </a>
        <a
          className={graduateStyle}
          href="#"
          onClick={() => this.setStyle("graduate")}
        >
          Graduated Projects
        </a>
      </div>
    );
  }

  setStyle = picked => {
    this.setState({ picked: picked });
    this.props.changeFilter(picked);
  };
}
export default FilterProjects;
