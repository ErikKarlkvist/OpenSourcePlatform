import React, { Component } from "react";
import firebase from "../backend/firebase";
import "../resources/Main.css";
import { getUser } from "../backend/users.js";
import LoginRegister from "../components/common/LoginRegister";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import logo from "../logo.svg";
import "../resources/Main.css";

const Form = () => {
  return (
    <div>
      <form>
        <label>
          Project Title
          <input type="text" name="projectTitle" />
        </label>
        <label>
          Description
          <input type="text" name="description" />
        </label>
        <label>
          Looking for
          <input type="text" name="projectTitle" />
        </label>
        <label>
          Current state
          <input type="text" name="projectTitle" />
        </label>
      </form>
    </div>
  );
};
class CreateProjectPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      hasFetchedUser: false,
      user: {}
    };
  }
  componentDidMount() {
    this.setupAuthStateChange();
  }

  setupAuthStateChange = () => {
    const page = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        getUser(user.uid).then(user => {
          page.setState({
            isLoggedIn: true,
            hasFetchedUser: true,
            user
          });
        });
      } else {
        page.setState({
          isLoggedIn: false,
          hasFetchedUser: true
        });
      }
    });
  };

  render() {
    return (
      <div className="PageContainer">
        <Spinner loading={!this.state.hasFetchedUser} fillPage={true} />
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="Logo" alt="logo" />
          </Link>
          <LoginRegister
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            hasFetchedUser={this.state.hasFetchedUser}
          />
        </header>

        <div class="Content">
          <h1>Create Project</h1>
          <Form />
        </div>
      </div>
    );
  }
}

export default CreateProjectPage;
