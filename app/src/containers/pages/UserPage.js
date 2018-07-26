import React, { Component } from "react";
import firebase from "../../backend/firebase";
import { getUser } from "../../backend/users.js";
import { getProject } from "../../backend/projects";
import HeaderMenu from "../common/HeaderMenu";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import logo from "../../logo.svg";
import "../../resources/Styles/ProjectInfo.css";

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
const UserInfo = props => {
  const styles = {
    Name: {
      fontSize: "24px"
    },
    Image: { display: "cover", height: "300px" }
  };

  return (
    <div className="container">
      <Container>
        <Big>
          <div style={styles.Name}>
            {props.user.firstname} {props.user.lastname}
          </div>
        </Big>
        <Small>
          <img
            src={props.user.profileImageURL}
            style={styles.Image}
            alt={props.user.firstname}
          />
        </Small>
      </Container>
    </div>
  );
};

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isLoggedIn: false,
      hasFetchedUser: false,
      displayUser: {}
    };
  }

  componentDidMount() {
    this.setupAuthStateChange();
    getUser(this.props.match.params.userId).then(user => {
      if (user) {
        this.setState({ displayUser: user, loading: false });
      }
    });
  }

  setupAuthStateChange() {
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
  }

  render() {
    if (!this.state.loading) {
      return (
        <div className="PageContainer">
          <div className="Content">
            <header className="App-header">
              <Link to="/">
                <img src={logo} className="Logo" alt="logo" />
              </Link>
              <HeaderMenu
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
                hasFetchedUser={this.state.hasFetchedUser}
              />
            </header>
            <UserInfo user={this.state.displayUser} />
          </div>
        </div>
      );
    } else {
      return <Spinner loading={this.state.loading} fillPage={true} />;
    }
  }
}

export default UserPage;
