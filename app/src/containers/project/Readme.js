import React, { Component } from "react";
import Markdown from "react-remarkable";
import "../../resources/Styles/Readme.css";

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
    this.fetchLink(this.props.project.readmeURL);
  }

  fetchLink = link => {
    fetch(link)
      .then(response => {
        return response.text();
      })
      .then(text => {
        this.setState({ text: text });
      });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.fetchLink(nextProps.project.readmeURL);
    }
  }

  render() {
    if (!this.props.readmeURL && !this.props.project.readmeURL) {
      return <div />;
    }
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
