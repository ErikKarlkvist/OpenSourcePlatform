import React, { Component } from "react";
import "./ProjectInfo.css";
import "../../resources/Main.css";
import LoginForm from "../common/LoginForm";
import SignupForm from "../common/SignupForm";
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
  return <div class="row">{props.children}</div>;
};

const LeftContent = props => {
  const style = {};
  return (
    <div style={style} class={"col-md-12 col-sm-12 col-lg-6"}>
      {props.children}
    </div>
  );
};

const RightContent = props => {
  const style = {};
  return (
    <div style={style} class={"col-md-12 col-sm-12 col-lg-6"}>
      {props.children}
    </div>
  );
};

const GreenBox = props => {
  const style = {
    paddingLeft: "20px",
    paddingRight: "20px"
  };
  return (
    <div style={style} class="GreenBox">
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
      textAlign: "left",
      width: "100%"
    }
  };
  return (
    <div style={styles.Description}>
      {props.children}
      <h3 style={styles.HeaderText}>What is {props.project.name}?</h3>
      <p style={styles.Description}>{props.project.description}</p>
      <div style={{ paddingTop: "40px" }} />
    </div>
  );
};

const Image = props => {
  const style = {
    width: "519px",
    height: "374px",
    objectFit: "cover",
    boxShadow: "1px 1px 1px 1px black",
    marginTop: "10px"
  };
  return <img src={props.project.headerImageURL} style={style} />;
};

class ProjectInfo extends Component {
  //"joinStatus === joined, requested or none"
  state = {
    displayLogin: false
  };

  componentDidMount() {
    if (
      this.props.project &&
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
    if (this.props.project === undefined) {
      return <div />;
    }
    return (
      <InfoContainer>
        {/*Login and signup modals, hidden until prompted */}
        {this.state.displayLogin && (
          <LoginForm hide={this.hide} switchDisplay={this.switchDisplay} />
        )}
        {this.state.displaySignup && (
          <SignupForm hide={this.hide} switchDisplay={this.switchDisplay} />
        )}
        <h1 style={{ textAlign: "left", marginTop: "80px" }}>
          {this.props.project.name}
        </h1>
        <Container>
          <LeftContent>
            <GreenBox>
              <Description project={this.props.project} />
              <Seeking lookingFor={this.props.project.lookingFor} />
              <Contributors developers={this.props.project.owners} />
            </GreenBox>
          </LeftContent>
          <RightContent>
            <Image project={this.props.project} />
            <ProjectMetrics gitURL={this.props.project.gitURL} />
          </RightContent>
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
