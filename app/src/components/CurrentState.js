import React, { Component } from "react";
import Slider from "react-slick";
import "./CurrentState.css";

class CurrentState extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
    return (
      <div className="currentStateContainer">
        <h2
          style={{
            paddingBottom: "30px",
            textAlign: "left"
          }}
        >
          Current State
        </h2>

        <Slider settings={settings}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
const styles = {};

export default CurrentState;
