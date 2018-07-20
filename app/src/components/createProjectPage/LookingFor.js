import React, { Component } from "react";
import Seeking from "../projectPage/Seeking";
import Button from "../common/Button";
import InputTextBox from "./InputTextBox";

class LookingFor extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      submitted: []
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

  //Remove item 'index' from the submitted list. Index = int
  removeItem = index => {
    const newItems = [...this.state.submitted].filter((d, i) => i !== index);
    this.setState({ submitted: newItems });
  };

  render() {
    return (
      <div>
        <Seeking
          lookingFor={this.state.submitted}
          removeItem={this.removeItem}
        />
        <div className="row" style={{justifyContent:"space-between", marginLeft: "5px", marginRight:"5px"}}>
          <div className="col-7">
            <input
              type="text"
              name="lookingFor"
              placeholder="Role"
              className="LookingFor"
              value={this.state.value}
              onChange={e => {
                this.onChange(e);
                this.props.handleInputChange(e);
              }}
              onKeyPress={e => this.handleKeyPress(e)}

            />
          </div>
          <div className="col-5">
            <Button onClick={this.submitField}>Add</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default LookingFor;
