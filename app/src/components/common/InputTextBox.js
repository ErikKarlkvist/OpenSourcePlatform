import React, { Component } from "react";
import PropTypes from "prop-types";

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

/*
* CSS for className is set in resources/style/Input.css
*/
class InputTextBox extends Component {
  checkInputLength = e => {
    if (this.props.maxChars === undefined) {
      this.props.handleInputChange(e);
    } else if (
      e.target.value.length <= this.props.maxChars ||
      e.target.value.length < this.props.value.length
    ) {
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
          <p style={this.styles.errorText}>{this.props.invalidText}</p>
        )}
      </div>
    );
  }

  renderInput() {
    return (
      <div>
        <input
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          className={this.props.className}
          value={this.props.value}
          style={{ color: this.props.textColor }}
          onChange={e => {
            this.checkInputLength(e);
          }}
        />
        <p style={this.styles.charCounter}>
          {this.props.maxChars &&
            this.props.showCounter &&
            this.props.value.length + "/" + this.props.maxChars}
        </p>
      </div>
    );
  }

  renderTextarea() {
    return (
      <div>
        <textarea
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          className={this.props.className}
          value={this.props.value}
          style={{ color: this.props.textColor }}
          onChange={e => {
            this.checkInputLength(e);
          }}
        />
        <p style={this.styles.charCounter}>
          {this.props.maxChars &&
            this.props.showCounter &&
            this.props.value.length + "/" + this.props.maxChars}
        </p>
      </div>
    );
  }

  styles = {
    charCounter: {
      color: this.props.textColor,
      textAlign: "right",
      marginRight: "20px"
    },
    errorText: {
      color: "var(--bright-orange)",
      width: "90%",
      fontSize: "14px",
      fontStyle: "italic",
      textAlign: "left",
      padding: "5px",
      marginLeft: "30px"
    }
  };
}

InputTextBox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  maxChars: PropTypes.number,
  showCounter: PropTypes.bool
};

InputTextBox.defaultProps = {
  textColor: "white",
  type: "text",
  className: "inputTextBox multiliner",
  showCounter: true
};

export default InputTextBox;
