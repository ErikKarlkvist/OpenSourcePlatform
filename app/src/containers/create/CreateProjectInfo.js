import React, { Component } from "react";
import LookingFor from "./CreateSeeking";
import UserSearch from "./UserSearch";
import UploadImage from "./UploadImage";
import InputTextBox from "../../components/common/InputTextBox";
import ProjectMetrics from "../project/ProjectMetrics";
import HeaderWithTooltip from "../../components/common/HeaderWithTooltip";
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
  return <div className="row">{props.children}</div>;
};

//create components of big and small? They are used 3 times
const Big = props => {
  return (
    <div className={"col-md-7 col-sm-12 col-lg-7 ProjectInfoLeft"}>
      {props.children}
    </div>
  );
};

const Small = props => {
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

const Contact = props => {
  const styles = {
    header: {
      textAlign: "left"
    }
  };
  return (
    <div>
      <h3 style={styles.header}>Contact</h3>
      <InputTextBox
        title="Contact email"
        placeholder="Your contact email"
        name="contactMail"
        type="email"
        value={props.value}
        handleInputChange={e => props.handleInputChange(e)}
        className={"inputTextBox"}
        validate={validateEmail}
        invalidText={"Not a valid email"}
      />
    </div>
  );
};

//move to a more generic place?
const TooltipTexts = {
  Description:
    "Your description should cover what problem your project solves, and how it solves it",
  GithubRepo:
    "Paste the link to your project's Github repository here, and the project metrics will automatically be fetched. <br /> If you do not use GitHub, leave this blank.<br /> Should look like this: https://github.com/ErikKarlkvist/OpenSourcePlatform",
  LookingFor:
    "If you're looking for a spesific skill or position to complement your team, add them here. <br /> Try to not be too spesific, as people are more likely to search for more general terms",
  Updates:
    "A living project is more likely to attract contributors, so use this space to show of what you have accomplished. <br />Post about new releases, launches, milestones, new team members, and that new deal you just struck",
  Owners:
    "Adding team members means other people can see who works on this project, and will display this project on their profile page"
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
            <div>
              <HeaderWithTooltip tooltip={TooltipTexts.Description}>
                What is {this.props.values.projectName}?
              </HeaderWithTooltip>
            </div>

            <Description
              description={this.props.values.description}
              handleInputChange={this.props.handleInputChange}
            />
          </Big>
          <Small>
            <HeaderWithTooltip tooltip={TooltipTexts.LookingFor}>
              Seeking (optional)
            </HeaderWithTooltip>
            <LookingFor
              value={this.props.values.lookingFor}
              handleInputChange={this.props.handleInputChange}
              setSeeking={this.props.setSeeking}
            />
            <br />
            <Contact
              value={this.props.values.contactMail}
              handleInputChange={e => this.props.handleInputChange(e)}
            />
          </Small>
          <Big>
            <div>
              <HeaderWithTooltip tooltip={TooltipTexts.GithubRepo}>
                Github repository (optional)
              </HeaderWithTooltip>

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
                  "Not a github repository. Embed the following: https://github.com/{username}/{repository-name})"
                }
              />
            </div>
            {validateGithubURL(this.props.values.gitURL) && (
              <ProjectMetrics gitURL={this.props.values.gitURL} />
            )}
            <p> </p>
          </Big>
          <Small>
            <HeaderWithTooltip tooltip={TooltipTexts.Owners}>
              Add team member
            </HeaderWithTooltip>
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
