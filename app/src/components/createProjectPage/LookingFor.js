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

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  submitField = () => {
    const newValue = this.state.value + "";
    this.setState({
      submitted: [...this.state.submitted, newValue],
      value: ""
    });
  };

  render() {
    return (
      <div>
        <div class="row">
          <input
            type="text"
            name="lookingFor"
            placeholder="Looking for"
            className="LookingFor"
            value={this.state.value}
            onChange={e => {
              this.onChange(e);
              this.props.handleInputChange(e);
            }}
          />
          <Button onClick={this.submitField}>Submit</Button>
        </div>
        <Seeking lookingFor={this.state.submitted} />
      </div>
    );
  }
}

export default LookingFor;
