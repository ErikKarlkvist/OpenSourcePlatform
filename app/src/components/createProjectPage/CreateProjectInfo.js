import React, { Component } from "react";
import LookingFor from "./LookingFor";
import Contact from "../projectPage/Contact";
import UserSearch from "../common/UserSearch";
import UploadImage from "./UploadImage";
import InputTextBox from "./InputTextBox";

const AddTitle = props => {
  return (
    <div style={{ marginLeft: "3%" }}>
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
const Container = props => {
  const style = {
    paddingRight: "0px",
    paddingLeft: "0px",
    height: "auto",
    alignContent: "space-between"
  };
  return <div className="row">{props.children}</div>;
};

const Big = props => {
  const style = {
    borderRight: "solid 2px white",
    paddingRight: "30px"
  };
  return (
    <div className={"col-md-7 col-sm-12 col-lg-7 ProjectInfoLeft"}>
      {props.children}
    </div>
  );
};

const Small = props => {
  const style = {};
  return (
    <div className={"col-md-5 col-sm-12 col-lg-5 ProjectInfoRight"}>
      {props.children}
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

          <UploadImage
            type={"headerImage"}
            id={this.state.projectID}
            recieveURL={this.recieveURL}
            uploadLabel={"Upload header image"}
          />
*/

class CreateProjectInfo extends Component {
  render() {
    return (
      <div style={this.styles.container}>
        <Container>
          <AddTitle
            projectName={this.props.values.projectName}
            handleInputChange={this.props.handleInputChange}
          />

          <Big>
            <h3 style={{ textAlign: "left", marginLeft: "40px" }}>
              What is {this.props.values.projectName}?
            </h3>
            <Description
              description={this.props.values.description}
              handleInputChange={this.props.handleInputChange}
            />
          </Big>
          <Small>
            <LookingFor
              value={this.props.values.lookingFor}
              handleInputChange={this.props.handleInputChange}
            />
            <div>
              <InputTextBox
                title="Contact email"
                placeholder="Your contact email"
                name="contactMail"
                maxChars={25}
                value={this.props.values.contactMail}
                handleInputChange={e => this.props.handleInputChange(e)}
                className={"inputTextBox"}
              />
            </div>
          </Small>
          <Big>
            {
              //add project metrics here
            }
            <div>
              <input
                type="text"
                name="gitURL"
                placeholder="URL of Code Repository"
                className="inputTextBox"
                value={this.props.values.gitURL}
                onChange={e => this.props.handleInputChange(e)}
              />
            </div>
          </Big>
          <Small>
            <UserSearch
              removeOwner={this.props.removeOwner}
              addOwner={this.props.addOwner}
              recieveURL={this.props.recieveURL}
            />
          </Small>
        </Container>
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
