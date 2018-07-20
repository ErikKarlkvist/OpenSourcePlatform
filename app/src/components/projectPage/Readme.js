import React, { Component } from "react";
import Markdown from "react-remarkable";
import "./Readme.css";

/*
* Displays the project's readme.md file
* Fetches from the github page, displays as a markdown text
* Lots of CSS went into the making of this component, including overwriting overwritten settings for headers. See Readme.css
*/
const ErrorText = () => {
  const style = {
    color: "red"
  };
  return (
    <p style={style}>
      Could not parse link. Are you sure this is a raw .md file?
    </p>
  );
};

const Header = () => {
  const style = {
    paddingBottom: "30px",
    textAlign: "left"
  };
  return <h2 style={style}>README</h2>;
};

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

  addHeader = text => {
    return <h1>Readme from {this.props.projectName}'s repo</h1>;
  };

  render() {
    if (!this.props.readmeURL) {
      return <div />;
    }
    return (
      <div className="readmeContainer">
        <div className="markdown">
          {this.props.projectName !== "" && this.addHeader()}

          <Markdown source={this.state.text} className="markdownInner" />
        </div>
      </div>
    );
  }
}
export default Readme;
