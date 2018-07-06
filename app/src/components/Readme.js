import React, { Component } from "react";
import Markdown from "react-remarkable";
import "./Readme.css";

class Readme extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/ErikKarlkvist/OpenSourcePlatform/master/README.md"
    )
      .then(response => response.text())
      .then(text => {
        this.setState({ text });
      });
  }

  render() {
    return (
      <div className="readmeContainer">
        <h2
          style={{
            paddingBottom: "30px",
            textAlign: "left"
          }}
        >
          README
        </h2>
        <div className="markdownOuter">
          <Markdown source={this.state.text} className="markdownInner" />
        </div>
      </div>
    );
  }
}
export default Readme;
