import React, { Component } from "react";
import UploadImage from "./UploadImage";
import InputTextBox from "./InputTextBox";

class Form extends Component {
  render() {
    return (
      <div>
        <div>
          Link to GitHub page
          <input
            type="text"
            name="gitURL"
            placeholder="URL of Code Repository"
            className="inputTextBox"
            value={this.props.values.gitURL}
            onChange={e => this.props.handleInputChange(e)}
          />
        </div>
        <div>
          Link to Github readme (raw file)
          <input
            type="text"
            name="readmeURL"
            placeholder="URL to raw README.md file"
            className="inputTextBox"
            value={this.props.values.readmeURL}
            onChange={e => this.props.handleInputChange(e)}
          />
        </div>
        <UploadImage
          type={"headerImage"}
          id={this.props.projectID}
          recieveURL={this.props.recieveURL}
        />
        {this.props.values.headerImageURL !== "" && (
          <div>
            <img src={this.props.values.headerImageURL} />
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  inputTextBox: {
    width: "100%",
    border: "3px dotted grey",
    backgroundColor: "rgba(1, 1, 1, 0)",
    color: "white",
    height: "40px",
    marginBottom: "20px",
    paddingLeft: "12px",
    boxSizing: "border-box",
    borderRadius: "4px"
  }
};

export default Form;
