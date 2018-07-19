import React, { Component } from "react";
import Markdown from "react-remarkable";
import "./Readme.css";

/*
* Displays the project's readme.md file
* Fetches from the github page, displays as a markdown text
* Lots of CSS went into the making of this component, including overwriting overwritten settings for headers. See Readme.css
*/
class Readme extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  componentDidMount() {
    fetch(this.props.project.readmeURL)
      .then(response => response.text())
      .then(text => {
        this.setState({ text });
      });
  }

  render() {
    return (
      <div className="readmeContainer">
        <div className="markdown">
          <Markdown source={this.state.text} className="markdownInner" />
        </div>
      </div>
    );
  }
}
export default Readme;
