import React, { Component } from "react";
import "./AnimatedMenu.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { logout } from "../../backend/auth";

class LoginRegister extends Component {
  constructor() {
    super();
    this.state = {
      displaySignup: false,
      displayLogin: false,
      loading: false
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
            <LoginForm hide={this.hide} switchDisplay={this.switchDisplay} />
          )}
          {this.state.displaySignup && (
            <SignupForm hide={this.hide} switchDisplay={this.switchDisplay} />
          )}
          <div>
            <a
              className={"MenuItem"}
              onClick={() => this.setState({ displaySignup: true })}
            >
              Sign up
            </a>
            <a> | </a>
            <a
              className={"MenuItem"}
              onClick={() => this.setState({ displayLogin: true })}
            >
              Log in
            </a>
          </div>
          <div style={styles.line} />
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
            <div style={styles.option}>
              <Link
                className={"MenuItem"}
                to={"/createProject"}
                style={{ textDecoration: "none" }}
                onClick={() => {}}
              >
                <span>Create Project</span>
              </Link>
            </div>
            <div style={styles.option}>
              <Link
                className={"MenuItem"}
                to={"/createProject"}
                style={{ textDecoration: "none" }}
                onClick={() => {}}
              >
                <span>Your Projects</span>
              </Link>
            </div>
            <div style={styles.option}>
              <a className={"MenuItem"} onClick={this.logout}>
                Log out
              </a>
            </div>
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
