import React, { Component } from "react";
import "./Form.css";

class InputTextBox extends Component {
  constructor() {
    super();
    this.state = {
      chars: 0
    };
  }

  checkInputLength = e => {
    if (this.props.maxChars && e.target.value.length <= this.props.maxChars) {
      this.props.handleInputChange(e);
      this.setState({ chars: e.target.value.length });
    }
  };
  render() {
    return (
      <div>
        {this.props.title}{" "}
        {this.props.maxChars && this.state.chars + "/" + this.props.maxChars}
        <textarea
          contenteditable="true"
          type="text"
          name={this.props.name}
          placeholder={this.props.placeholder}
          className="inputTextBox multiliner"
          value={this.props.value}
          onChange={e => {
            this.checkInputLength(e);
          }}
        />
      </div>
    );
  }
}

export default InputTextBox;
