import React, { Component } from "react";
import firebase from "../../backend/firebase";
import { getUser } from "../../backend/users.js";
import { getProjectsForUser } from "../../backend/projects";
import HeaderMenu from "../common/HeaderMenu";
import { Link } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import logo from "../../logo.svg";
import "../../resources/Styles/ProjectInfo.css";
import ProjectsDisplay from "../../components/homePage/ProjectsDisplay";
import Line from "../../components/common/Line";
import InputTextBox from "../../components/common/InputTextBox";
import Button from "../../components/common/Button";
import { setUser } from "../../backend/users";
import UploadImage from "../create/UploadImage";
import { resendVerificationEmail, resetPassword } from "../../backend/auth";

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
  return <div className={"col-md-5 col-sm-12 col-lg-5"}>{props.children}</div>;
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
      marginBottom: "20px",
      marginTop: "40px"
    },
    EditText: {
      textAlign: "left",
      color: "white",
      cursor: "pointer",
      textDecoration: "underline"
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "30px"
    },
    button: {
      width: "150px"
    }
  };

  return (
    <Container>
      <Big>
        {props.editing ? (
          <div>
          <InputTextBox
              title="First name"
              placeholder="Your first name"
              name="firstname"
              maxChars={50}
              textColor={"white"}
              value={props.firstname}
              handleInputChange={e => props.onChange(e)}
              className={"Name"}
              multiline={true}
            />
            <InputTextBox
            title="Last name"
            placeholder="Your last name"
            name="lastname"
            maxChars={50}
            textColor={"white"}
            value={props.lastname}
            handleInputChange={e => props.onChange(e)}
            className={"Name"}
            multiline={true}
          /></div>)
        : (<h1 style={styles.Name}>
          {props.firstname} {props.lastname}
        </h1>)}
        {props.editing ? (
          <div>
            <InputTextBox
              title="Description"
              placeholder="Describe yourself"
              name="description"
              maxChars={600}
              textColor={"white"}
              value={props.description}
              handleInputChange={e => props.onChange(e)}
              className={"Description"}
              multiline={true}
            />
          </div>
        ) : (
          <p style={{ color: "white", textAlign: "left", minHeight: "200px" }}>
            {props.description}
          </p>
        )}
        {props.isMyProfile && (
          <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-12">
              {props.editing ? (
                <div style={styles.buttonContainer}>
                  <Button style={styles.button} onClick={props.submitUser}>
                    Submit
                  </Button>
                </div>
              ) : (
                <p onClick={props.setEdit} style={styles.EditText}>
                  Edit personal info
                </p>
              )}
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
              <p onClick={() => resetPassword()} style={styles.EditText}>
                Change password
              </p>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
              <p
                onClick={() => resendVerificationEmail()}
                style={styles.EditText}
              >
                Re-send verification email
              </p>
            </div>
          </div>
        )}
      </Big>
      <Small>
        <img
          src={props.user.profileImageURL}
          style={styles.Image}
          alt={props.user.firstname}
        />
        {props.isMyProfile && (
          <UploadImage
            type="profileImage"
            id={props.user.id}
            receiveURL={props.receiveURL}
          />
        )}
      </Small>
    </Container>
  );
};

const Projects = props => {
  const styles = {
    topMargin: {
      marginTop: "40px",
      textAlign: "left"
    },
    text: {
      textAlign: "left",
      marginTop: "40px"
    }
  };
  return (
    <div className="container" style={styles.topMargin}>
      <div className="row">
        <Line full={true} />
        <h1 style={styles.text} className="col-12">
          Projects
        </h1>
        <div style={styles.topMargin} className="col-12 Center">
          {props.projects.length > 0 && (
            <ProjectsDisplay projects={props.projects} />
          )}
        </div>
        {props.projects.length === 0 && (
          <h2 className="col-12">No projects found</h2>
        )}
      </div>
    </div>
  );
};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isLoggedIn: false,
      hasFetchedUser: false,
      user: {},
      displayUser: {},
      editing: false,
      description: "",
      firstname: "",
      lastname: "",
      isMyProfile: false,
      userId: props.match.params.userId
    };
  }

  receiveURL = () => {
    this.setupData(this.state.userId);
  };

  loadUser = () => {
    this.setupAuthStateChange();
    this.setupData(this.state.userId);
  };

  setupData(userId) {
    getUser(userId).then(user => {
      if (user) {
        this.setState({
          displayUser: user,
          loading: false,
          description: user.description ? user.description : "",
          firstname: user.firstname ? user.firstname: "",
          lastname: user.lastname ? user.lastname: "",
          editing: !user.description || !user.description.trim()
        });
      }
    });

    getProjectsForUser(userId).then(projects => {
      if (projects) {
        this.setState({ projects });
      }
    });
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(nextProps) {
    if (nextProps !== this.props) {
      this.loadUser();
    }
  }

  componentWillReceiveProps(props) {
    if (props.match.params.userId !== this.state.userId) {
      this.setState({ userId: props.match.params.userId, loading: true });
      this.setupData(props.match.params.userId);
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
            user,
            isMyProfile: page.props.match.params.userId === user.id
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
      description: this.state.description,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
              firstname={this.state.firstname}
              lastname={this.state.lastname}
              description={this.state.description}
              onChange={e => this.onChange(e)}
              submitUser={this.submitUser}
              setEdit={this.setEdit}
              isMyProfile={this.state.isMyProfile}
              receiveURL={this.receiveURL}
            />

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
