import React, { Component } from "react";
import firebase from "../../backend/firebase";
import { getUser } from "../../backend/users.js";
import { getProjectsForUser } from "../../backend/projects";
import HeaderMenu from "../common/HeaderMenu";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import logo from "../../logo.svg";
import "../../resources/Styles/ProjectInfo.css";
import ProjectsDisplay from "../../components/homePage/ProjectsDisplay";
import Line from "../../components/common/Line";
import InputTextBox from "../../components/common/InputTextBox";
import Button from "../../components/common/Button";
import { setUser } from "../../backend/users";
import UploadImage from "../create/UploadImage";

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

const UserInfo = props => {
  const styles = {
    Name: {
      textAlign: "left"
    },
    Image: {
      objectFit: "cover",
      height: "250px",
      width: "250px",
      borderRadius: "50%",
      marginBottom: "20px"
    }
  };

  return (
    <Container>
      <Big>
        <h1 style={styles.Name}>
          {props.user.firstname} {props.user.lastname}
        </h1>

        {props.editing ? (
          <div>
            <InputTextBox
              title="Description"
              placeholder="Describe yourself"
              name="description"
              maxChars={200}
              textColor={"white"}
              value={props.description}
              handleInputChange={e => props.onChange(e)}
              className={"Description"}
              multiline={true}
            />
            <Button onClick={props.submitUser}>Submit</Button>
          </div>
        ) : (
          <p style={{ color: "white", textAlign: "left" }}>
            {props.description}
          </p>
        )}
      </Big>
      <Small>
        <img
          src={props.user.profileImageURL}
          style={styles.Image}
          alt={props.user.firstname}
        />
        <UploadImage type="profileImage" id={props.user.id} />
        {}
      </Small>
    </Container>
  );
};

const Projects = props => {
  const styles = {
    container: {
      marginTop: "40px"
    },
    text: {
      textAlign: "left"
    }
  };
  return (
    <div style={styles.container} className="Center">
      <Line full={true} />
      <h1 style={styles.text}>Projects</h1>
      <div style={styles.container}>
        <ProjectsDisplay projects={props.projects} />
      </div>
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
      displayUser: {},
      editing: false,
      description: "",
      isMyProfile: false
    };
  }

  loadUser = () => {
    this.setupAuthStateChange();
    getUser(this.props.match.params.userId).then(user => {
      if (user) {
        this.setState({
          displayUser: user,
          loading: false,
          description: user.description
        });
      }
    });

    getProjectsForUser(this.props.match.params.userId).then(projects => {
      if (projects) {
        this.setState({ projects });
      }
    });
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.loadUser();
    }
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

  setEdit = () => {
    this.setState({ editing: true });
  };

  submitUser = () => {
    this.setState({ editing: false });
    setUser(this.state.user.id, {
      ...this.state.user,
      description: this.state.description
    });
  };

  onChange = e => {
    this.setState({ description: e.target.value });
  };

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
            <UserInfo
              user={this.state.displayUser}
              editing={this.state.editing}
              description={this.state.description}
              onChange={e => this.onChange(e)}
              submitUser={this.submitUser}
            />
            <Button onClick={this.setEdit}>Edit</Button>
            <Projects projects={this.state.projects} />
          </div>
        </div>
      );
    } else {
      return <Spinner loading={this.state.loading} fillPage={true} />;
    }
  }
}

export default UserPage;
