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

const Big = props => {
  const style = {
    borderRight: "solid 2px white",
    paddingRight: "30px"
  };
  return (
    <div class={"col-md-7 col-sm-12 col-lg-7 ProjectInfoLeft"}>
      {props.children}
    </div>
  );
};

const Small = props => {
  const style = {};
  return (
    <div class={"col-md-5 col-sm-12 col-lg-5 ProjectInfoRight"}>
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
    }
  };
  return (
    <div>
      {props.children}
      <h3 style={styles.HeaderText}>What is {props.project.name}?</h3>
      <p style={styles.Description}>{props.project.description}</p>
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
          <Big>
            <Description project={this.props.project} />
          </Big>
          <Small>
            <Seeking lookingFor={this.props.project.lookingFor} />
          </Small>
          <Big>
            <ProjectMetrics gitURL={this.props.project.gitURL} />
          </Big>
          <Small>
            <Contributors developers={this.props.project.owners} />
          </Small>
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
