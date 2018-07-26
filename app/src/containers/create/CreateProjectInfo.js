import React, { Component } from "react";
import LookingFor from "./CreateSeeking";
import UserSearch from "./UserSearch";
import UploadImage from "./UploadImage";
import InputTextBox from "../../components/common/InputTextBox";
import ProjectMetrics from "../project/ProjectMetrics";
import { validateGithubURL, validateEmail } from "../../backend/validation";

const AddTitle = props => {
  return (
    <div>
      <InputTextBox
        title="Project title"
        placeholder="Add project title"
        name="projectName"
        maxChars={20}
        value={props.projectName}
        onChange={e => props.handleInputChange(e)}
        handleInputChange={e => props.handleInputChange(e)}
        className={"Title"}
      />
    </div>
  );
};

const Description = props => {
  return (
    <div>
      <InputTextBox
        title="Project Description"
        placeholder="Add a descriptive text for your project. Max 300 characters."
        name="description"
        maxChars={300}
        value={props.description}
        onChange={e => props.handleInputChange(e)}
        handleInputChange={e => props.handleInputChange(e)}
        className={"Description"}
        multiline={true}
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

const Top = props => {
  const styles = {
    container: {
      width: "100%"
    },
    removeLabel: {
      cursor: "pointer",
      textDecoration: "underline",
      fontStyle: "italic",
      width: "200px",
      textAlign: "center"
    },
    removeLabelContainer: {
      display: "flex",
      justifyContent: "flex-start",
      marginTop: "20px",
      marginLeft: "20px",
      width: "200px",
      marginBottom: "20px"
    }
  };

  return (
    <div style={styles.container} className="row">
      <div className="col-md-7 col-sm-12 col-lg-7">
        <AddTitle
          projectName={props.projectName}
          handleInputChange={props.handleInputChange}
        />
      </div>
      <div className="col-md-5 col-sm-12 col-lg-5">
        {!props.headerImageURL && (
          <UploadImage
            type={"headerImage"}
            id={props.projectID}
            recieveURL={props.recieveURL}
            label="Upload header image"
          />
        )}
        {props.headerImageURL && (
          <div style={styles.removeLabelContainer}>
            <a onClick={props.removeHeaderImage} style={styles.removeLabel}>
              Remove header image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

class CreateProjectInfo extends Component {
  render() {
    return (
      <div style={this.styles.container}>
        <Container>
          <Top
            projectName={this.props.values.projectName}
            handleInputChange={this.props.handleInputChange}
            projectID={this.props.projectID}
            recieveURL={this.props.recieveURL}
            headerImageURL={this.props.values.headerImageURL}
            removeHeaderImage={this.props.removeHeaderImage}
          />
          <Big>
            <h3 style={{ textAlign: "left" }}>
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
              setSeeking={this.props.setSeeking}
            />
            <InputTextBox
              title="Contact email"
              placeholder="Your contact email"
              name="contactMail"
              type="email"
              value={this.props.values.contactMail}
              handleInputChange={e => this.props.handleInputChange(e)}
              className={"inputTextBox"}
              validate={validateEmail}
              invalidText={"Not a valid email"}
            />
          </Small>
          <Big>
            <div>
              {!validateGithubURL(this.props.values.gitURL) && (
                <h3 style={{ textAlign: "left" }}>Metrics</h3>
              )}
              <InputTextBox
                title="GitURL"
                placeholder="Github repository url. Needed for metrics and 'Get code!' button"
                name="gitURL"
                value={this.props.values.gitURL}
                handleInputChange={e => this.props.handleInputChange(e)}
                onChange={e => this.props.handleInputChange(e)}
                className={"inputTextBox"}
                validate={validateGithubURL}
                invalidText={
                  "Not a github repository. Embed the following: https://github.com/{username}/{repository-name}/)"
                }
              />
            </div>
            <p> </p>
            {validateGithubURL(this.props.values.gitURL) && (
              <ProjectMetrics gitURL={this.props.values.gitURL} />
            )}
          </Big>
          <Small>
            <UserSearch
              removeOwner={this.props.removeOwner}
              setOwners={this.props.setOwners}
              recieveURL={this.props.recieveURL}
              currentOwners={this.props.values.owners}
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
