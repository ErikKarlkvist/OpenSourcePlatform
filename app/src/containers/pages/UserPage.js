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
    marginTop: "100px"
  };
  return (
    <div style={style} className="container">
      <div className="row">{props.children}</div>
    </div>
  );
};

const Big = props => {
  const style = {
    border: "1px solid black"
  };
  return (
    <div className={"col-md-7 col-sm-12 col-lg-7 ProjectInfoLeft"}>
      {props.children}
    </div>
  );
};

const Small = props => {
  const style = { border: "1px solid black" };
  return (
    <div className={"col-md-5 col-sm-12 col-lg-5 ProjectInfoRight"}>
      {props.children}
    </div>
  );
};
const UserInfo = props => {
  const styles = {
    Name: {
      textAlign: "left"
    },
    Image: { objectFit: "cover", height: "200px", borderRadius: "50%" }
  };

  return (
    <Container>
      <Big>
        <h1 style={styles.Name}>
          {props.user.firstname} {props.user.lastname}
        </h1>
        <p style={{ color: "white", textAlign: "left" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          ultrices vitae odio eget scelerisque. Sed odio leo, blandit pharetra
          imperdiet eu, blandit ac erat. Morbi nibh diam, hendrerit sed lacinia
          vel, ullamcorper ut dui. Phasellus est turpis, facilisis vel augue
          nec, pulvinar maximus erat. Orci varius natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Ut ac odio id nisi
          tempor efficitur. Morbi gravida nibh nec hendrerit fringilla. Interdum
          et malesuada fames ac ante ipsum primis in faucibus.
        </p>
      </Big>
      <Small>
        <img
          src={props.user.profileImageURL}
          style={styles.Image}
          alt={props.user.firstname}
        />
      </Small>
    </Container>
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
