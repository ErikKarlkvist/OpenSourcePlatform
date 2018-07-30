import React, { Component } from "react";
import Seeking from "../../components/project/Seeking";
import Button from "../../components/common/Button";
import InputTextBox from "../../components/common/InputTextBox";

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
    const submitted = [...this.props.value, newValue];
    this.setState({
      value: ""
    });
    this.props.setSeeking(submitted);
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.submitField();
    }
  };

  //Remove item 'index' from the submitted list. Index = int
  removeItem = index => {
    const newItems = [...this.props.value].filter((d, i) => i !== index);
    this.props.setSeeking(newItems);
  };

  render() {
    return (
      <div>
        <Seeking
          lookingFor={this.props.value}
          removeItem={this.removeItem}
          createMode={true}
        />
        <div
          className="row"
          style={{
            justifyContent: "space-between",
            marginLeft: "5px",
            marginRight: "5px"
          }}
        >
          <div className="col-7">
            <InputTextBox
              type="text"
              name="lookingFor"
              placeholder="Skill"
              className="LookingFor"
              value={this.state.value}
              handleInputChange={e => {
                this.onChange(e);
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
