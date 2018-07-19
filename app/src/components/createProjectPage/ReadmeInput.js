import React, { Component } from "react";
import InputTextBox from "./InputTextBox";
import Readme from "../projectPage/Readme";

const InvalidText = () => {
  const style = {
    color: "red"
  };
  return <p style={style}>Link is not a .md file</p>;
};
class ReadmeInput extends Component {
  constructor() {
    super();
    this.state = { value: "", validLink: true };
  }

  handleInputChange = e => {
    const link = e.target.value;
    this.setState({ value: link });
    //this.checkLink(link);
    this.props.handleInputChange(e);
    console.log(
      "ReadmeInput handleChange",
      e.target.value,
      this.state.validLink
    );
  };

  checkLink = link => {
    this.setState({ validLink: link.split(".").slice(-1)[0] === "md" });
  };
  render() {
    return (
      <div style={{ border: "1px solid red" }}>
        Link to readme.md file
        <InputTextBox
          handleInputChange={this.handleInputChange}
          name="readmeURL"
          value={this.state.value}
        />
        {this.state.validLink && (
          <Readme project={{ readmeURL: this.state.value }} />
        )}
        {!this.state.validLink &&
          this.state.value.length > 3 && <InvalidText />}
      </div>
    );
  }
}

export default ReadmeInput;
