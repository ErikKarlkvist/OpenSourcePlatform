import React, { Component } from "react";
import "./Form.css";
import Seeking from "../projectPage/Seeking";
import Button from "../common/Button";

class LookingFor extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      submitted: ["Dude", "Lady"]
    };
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  submitField = () => {
    const newValue = this.state.value + "";
    this.setState({
      submitted: [...this.state.submitted, newValue],
      value: ""
    });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.submitField();
    }
  };

  removeItem = item => {
    const newItems = this.state.submitted.filter(d => {
      return d !== item;
    });
    this.setState({ submitted: newItems });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-8">
            <input
              type="text"
              name="lookingFor"
              placeholder="Looking for"
              className="inputTextBox"
              value={this.state.value}
              onChange={e => {
                this.onChange(e);
                this.props.handleInputChange(e);
              }}
              onKeyPress={e => this.handleKeyPress(e)}
            />
          </div>
          <div className="col-4">
            <Button onClick={this.submitField}>Submit</Button>
          </div>
        </div>
        <Seeking
          lookingFor={this.state.submitted}
          removeItem={this.removeItem}
        />
      </div>
    );
  }
}

export default LookingFor;
