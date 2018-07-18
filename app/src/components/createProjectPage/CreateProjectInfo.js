import React, { Component } from "react";
import LookingFor from "./LookingFor";

const AddTitle = props => {
  return (
    <div>
      <input
        type="text"
        name="projectName"
        placeholder="Add Project Title"
        className="Title"
        value={props.projectName}
        onChange={e => props.handleInputChange(e)}
      />
    </div>
  );
};

const Description = props => {
  return (
    <div>
      <textarea
        type="text"
        name="description"
        color="white"
        placeholder="Add a descriptive text for your project. Max 200 characters."
        className="Description"
        value={props.description}
        onChange={e => props.handleInputChange(e)}
      />
    </div>
  );
};

/*
const LookingFor = props => {
	return(
		<div>
			<input
				type="text"
				name="lookingFor"
				placeholder="What role are you looking for?"
				className="LookingFor"
				value={props.lookingFor}
				onChange={e => props.handleInputChange(e)}
			/>
		</div>
	)
}
*/

class CreateProjectInfo extends Component {
  render() {
    return (
      <div style={this.styles.container}>
        <div>
          <AddTitle
            projectName={this.props.values.projectName}
            handleInputChange={this.props.handleInputChange}
          />
          <div className={"GreenBox"}>
            <h3 style={{ textAlign: "left", marginLeft: "40px" }}>
              What is {this.props.values.projectName}?
            </h3>
            <Description
              description={this.props.values.description}
              handleInputChange={this.props.handleInputChange}
            />
            <LookingFor
              value={this.props.values.lookingFor}
              handleInputChange={this.props.handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }

  styles = {
    container: {
      width: "100%",
      display: "flex",
      marginTop: "60px"
    }
  };
}

export default CreateProjectInfo;
