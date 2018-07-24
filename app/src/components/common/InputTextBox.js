import React, { Component } from "react";

/* INPUT EXAMPLE
title="Thumbnail Title"
placeholder="Thumbnail Title"
name="title"
maxChars={20}
textColor={"var(--dark-teal)"}
value={this.state.title}
handleInputChange={this.handleInputChange}
className={"Description"}
multiline={true}
*/
class InputTextBox extends Component {
  checkInputLength = e => {
    if (this.props.maxChars === undefined) {
      this.props.handleInputChange(e);
    } else if (e.target.value.length <= this.props.maxChars) {
      this.props.handleInputChange(e);
    }
  };

  render() {
    let valid = true;
    if (this.props.validate) {
      if (
        this.props.value.length > 0 &&
        !this.props.validate(this.props.value)
      ) {
        valid = false;
      }
    }

    return (
      <div>
        {!this.props.multiline && this.renderInput()}
        {this.props.multiline && this.renderTextarea()}
        {!valid && (
          <p
            style={{
              color: "var(--bright-orange)",
              width: "90%",
              fontSize: "14px",
              fontStyle: "italic",
              textAlign: "left",
              padding: "5px",
              marginLeft: "30px"
            }}
          >
            {this.props.invalidText}
          </p>
        )}
      </div>
    );
  }

  renderInput() {
    return (
      <div>
        <input
          type={this.props.type || "text"}
          name={this.props.name}
          placeholder={this.props.placeholder}
          className={this.props.className || "inputTextBox multiliner"}
          value={this.props.value}
          style={{ color: this.props.textColor || "white" }}
          onChange={e => {
            this.checkInputLength(e);
          }}
        />
      </div>
    );
  }

  renderTextarea() {
    return (
      <div>
        <textarea
          type={this.props.type || "text"}
          name={this.props.name}
          placeholder={this.props.placeholder}
          className={this.props.className || "inputTextBox multiliner"}
          value={this.props.value}
          style={{ color: this.props.textColor || "white" }}
          onChange={e => {
            this.checkInputLength(e);
          }}
        />
      </div>
    );
  }
  /* {this.props.title}{" "}
        {this.props.maxChars && this.state.chars + "/" + this.props.maxChars}*/
}

export default InputTextBox;
