import React, { Component } from "react";
import "../resources/fonts.css";
import "../resources/colors.css";
import "../resources/Main.css";
import "./Seeking.css";
import Button from "./Button";

class Seeking extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="TopHeader">
          <h2 style={{ float: "left" }}>Looking for</h2>
          <Button style={{ float: "right" }} onClick={this.mailContact}>
            Contact{" "}
          </Button>
        </div>
        <div className="SubContainer">
          <ul class="list-unstyled">
            <li>
              <h3>> Back-end programmer</h3>
            </li>
            <li>
              <h3>> UX designer</h3>
            </li>
          </ul>
          <br />
          <p style={{ color: "white" }}>
            Is this you? Don’t hesitate to contact us and join the team.
          </p>
        </div>
      </div>
    );
  }
  mailContact = () => {
    window.location = "mailto:xyz.dnb.no";
  };
}
export default Seeking;
