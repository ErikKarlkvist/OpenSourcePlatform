import React, { Component } from "react";
import "./ProjectInfo.css";
import "../../resources/Main.css";
import LoginForm from "../common/LoginForm";
import SignupForm from "../common/SignupForm";
import {
  requestJoinProject,
  removeRequestProject
} from "../../backend/projects";
import Contributors from "./Contributors";
import "../../resources/fonts.css";
import ProjectMetrics from "./ProjectMetrics";
import Seeking from "./Seeking";

const InfoContainer = props => {
  const style = {
    marginTop: "40px",
    marginBottom: "40px"
  };
  return <div style={style}> {props.children} </div>;
};

const Container = props => {
  const style = {
    paddingRight: "0px",
    paddingLeft: "0px",
    height: "auto",
    alignContent: "space-between"
  };
  return (
    <div style={style} class="container">
      {props.children}
    </div>
  );
};

const TopRow = props => {
  const style = {
    borderTop: "1px solid var(--dark-teal)",
    width: "100%",
    height: "auto"
  };
  return (
    <div style={style} class="row">
      {props.children}
    </div>
  );
};

const Description = props => {
  const styles = {
    HeaderText: {
      textAlign: "left"
    },
    Description: {
      color: "white",
      fontSize: 16,
      textAlign: "left"
    },
    MainImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      boxShadow: "1px 1px 1px 1px black"
    }
  };
  return (
    <div
      style={styles.Description}
      className="col-md-6 col-sm-12 col-lg-6 BorderTop BorderSides BorderBottom"
    >
      {props.children}
      <h3 style={styles.HeaderText}>What is {props.project.name}?</h3>
      <p style={styles.Description}>{props.project.description}</p>
      <div style={{ paddingTop: "40px" }} />
      <Seeking lookingFor={props.project.lookingFor} />
    </div>
  );
};

const Image = props => {
  const style = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    boxShadow: "1px 1px 1px 1px black"
  };
  return (
    <div class="col-md-6 col-sm-12 col-lg-6">
      <img src={props.project.headerImageURL} style={style} />
    </div>
  );
};
const BottomRow = props => {
  const style = {
    borderBottom: "1px solid var(--dark-teal)",
    width: "100%"
  };
  return (
    <div class="row" style={style}>
      <div class="col-md-6 col-sm-12 col-lg-6  BottomPadding">
        <Contributors developers={props.project.owners} />
      </div>
      <div class="col-md-6 col-sm-12 col-lg-6" style={{ paddingLeft: "20px" }}>
        <ProjectMetrics gitURL={props.project.gitURL} />
      </div>
    </div>
  );
};

class ProjectInfo extends Component {
  //"joinStatus === joined, requested or none"
  state = {
    displayLogin: false
  };

  componentDidMount() {
    if (
      this.props.project.joinRequest &&
      this.props.project.joinRequest.includes(this.props.user.id)
    ) {
      this.setState({
        joinStatus: "requested"
      });
    }
  }

  componentWillReceiveProps(props) {
    if (
      props.project.joinRequest &&
      props.project.joinRequest.includes(props.user.id)
    ) {
      this.setState({
        joinStatus: "requested"
      });
    }
  }
  hide = () => {
    this.setState({
      displaySignup: false,
      displayLogin: false
    });
  };

  render() {
    return (
      <InfoContainer>
        {/*Login and signup modals, hidden until prompted */}
        {this.state.displayLogin && (
          <LoginForm hide={this.hide} switchDisplay={this.switchDisplay} />
        )}
        {this.state.displaySignup && (
          <SignupForm hide={this.hide} switchDisplay={this.switchDisplay} />
        )}
        <Container>
          <h1 style={{ textAlign: "left" }}>{this.props.project.name}</h1>
          <TopRow>
            {/*Project info top part: Description, Seeking, Image*/}
            <Description project={this.props.project} />
            <Image project={this.props.project} />
          </TopRow>

          {/*Project info bottom part: Owners, Metrics*/}
          <BottomRow project={this.props.project} />
        </Container>
      </InfoContainer>
    );
  }

  mailContact = () => {
    window.location = "mailto:xyz.dnb.no";
  };

  switchDisplay = () => {
    if (this.state.displaySignup) {
      this.setState({
        displaySignup: false,
        displayLogin: true
      });
    } else {
      this.setState({
        displaySignup: true,
        displayLogin: false
      });
    }
  };

  hide = () => {
    this.setState({
      displaySignup: false,
      displayLogin: false
    });
  };
}

export default ProjectInfo;

const styles = {
  Description: {
    color: "white",
    fontSize: 16,
    textAlign: "left"
  },
  TopRow: {
    borderTop: "1px solid var(--dark-teal)",
    width: "100%",
    height: "auto"
  },
  BottomRow: {
    borderBottom: "1px solid var(--dark-teal)",
    width: "100%"
  },
  InfoContainer: {
    marginTop: "40px",
    marginBottom: "40px"
  },
  Sidebar: {
    color: "white",
    alignItems: "right"
  },
  MainImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    boxShadow: "1px 1px 1px 1px black"
  },
  HeaderText: {
    textAlign: "left"
  },
  Container: {
    paddingRight: "0px",
    paddingLeft: "0px",
    height: "auto",
    alignContent: "space-between"
  }
};
