import React, { Component } from "react";
import UploadImage from "./UploadImage";
import InputTextBox from "./InputTextBox";
import UserSearch from "../common/UserSearch";

class Form extends Component {
  render() {
    return (
      <div>
        <InputTextBox
          title="Project Title"
          placeholder="Project Title"
          name="projectName"
          maxChars={100}
          value={this.props.values.projectName}
          handleInputChange={this.props.handleInputChange}
        />
        <UserSearch
          removeOwner={this.props.removeOwner}
          addOwner={this.props.addOwner}
          recieveURL={this.props.recieveURL}
        />
        <div>
          Description
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="inputTextBox"
            value={this.props.values.description}
            onChange={e => this.props.handleInputChange(e)}
          />
        </div>
        {/*}
          <div>
            Current state
            <input type="text" name="currentState" />
          </div>
    */}
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
        <div>
          Contact mail
          <input
            type="text"
            name="contactMail"
            placeholder="Your email, so that people can contact you about your project"
            className="inputTextBox"
            value={this.props.values.contactMail}
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
        <div>
          Owners
          <input type="text" name="owners" />
        </div>
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
