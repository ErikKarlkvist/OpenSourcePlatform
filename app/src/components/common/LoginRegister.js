import React, { Component } from "react";
import "./AnimatedMenu.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { logout } from "../../backend/auth";

const RouteLink = props => {
  const style = {
    marginTop: 10,
    textAlign: "right"
  };
  return (
    <div style={style}>
      <Link
        className={"MenuItem"}
        to={props.to}
        style={{ textDecoration: "none" }}
        onClick={props.onClick}
      >
        <span>{props.text}</span>
      </Link>
    </div>
  );
};

const NormalLink = props => {
  return (
    <a
      className={"MenuItem"}
      style={{ textDecoration: "none" }}
      onClick={props.onClick}
    >
      {props.text}
    </a>
  );
};
class LoginRegister extends Component {
  defaultProps = {
    editLink: "/"
  };

  constructor() {
    super();
    this.state = {
      displaySignup: false,
      displayLogin: false,
      loading: false,
      navigateTo: undefined
    };
  }

  render() {
    //hooka med login
    if (!this.props.hasFetchedUser || this.state.loading) {
      return <div />;
    }

    if (!this.props.isLoggedIn) {
      return (
        <div>
          {this.state.displayLogin && (
            <LoginForm
              hide={this.hide}
              switchDisplay={this.switchDisplay}
              navigateTo={this.state.navigateTo}
            />
          )}
          {this.state.displaySignup && (
            <SignupForm
              hide={this.hide}
              switchDisplay={this.switchDisplay}
              navigateTo={this.state.navigateTo}
            />
          )}

          <div>
            <NormalLink
              text="Sign up"
              onClick={() => this.setState({ displaySignup: true })}
            />
            <a> | </a>
            <NormalLink
              text="Log in"
              onClick={() => this.setState({ displayLogin: true })}
            />
          </div>

          <div style={styles.line} />

          <div style={{ marginTop: "30px", textAlign: "right" }}>
            <NormalLink
              text="Create Project"
              onClick={() => {
                this.setState({
                  displayLogin: true,
                  navigateTo: "/create-project"
                });
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div style={styles.container}>
          <h5>
            Welcome {this.props.user.firstname} {this.props.user.lastname}
          </h5>
          <div style={styles.line} />
          <div style={styles.optionsContainer}>
            <RouteLink text="Create project" to="/create-project" />
            <RouteLink text="Your projects" to="/" />
            {this.props.canEdit && (
              <RouteLink text="Edit project" to={this.props.editLink} />
            )}
            <RouteLink text="Log out" to="/" onClick={this.logout} />
          </div>
        </div>
      );
    }
  }

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

  logout = () => {
    this.setState({ loading: true });
    logout().then(() => {
      this.setState({ loading: false });
    });
  };

  hide = () => {
    this.setState({
      displaySignup: false,
      displayLogin: false
    });
  };
}

const styles = {
  line: {
    borderBottom: "1px solid white",
    height: "20px",
    width: "150px",
    marginLeft: "50px",
    position: "absolute",
    right: 0,
    top: 40
  },
  optionsContainer: {
    marginTop: 30
  },
  option: {
    marginTop: 10,
    textAlign: "right"
  }
};
export default LoginRegister;
