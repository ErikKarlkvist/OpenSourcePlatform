import React, { Component } from "react";
import Spinner from "../../components/common/Spinner";
import { login, resetPassword } from "../../backend/auth";
<<<<<<< HEAD:app/src/components/common/LoginForm.js

const Header = () => {
  const style = {
    color: "var(--dark-teal)",
    textAlign: "center",
    paddingBottom: "20px"
  };
  return <h1 style={style}>Log in</h1>;
};

const Inputs = () => {
  const styles = {
    input: {
      width: "100%",
      backgroundColor: "var(--white-three)",
      paddingLeft: "10px",
      marginBottom: "25px",
      border: "1px solid var(--dark-teal)"
    }
  };

  return (
    <div>
      Email
      <input
        style={styles.input}
        type="email"
        name="email"
        placeholder="name@email.com "
      />
      Password:
      <input
        style={styles.input}
        type="password"
        name="password"
        placeholder="password"
      />
    </div>
  );
};

const Buttons = props => {
  const styles = {
    container2: {
      marginTop: "3%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    cancel: {
      margin: 20,
      cursor: "pointer"
    },
    create: {
      cursor: "pointer",
      margin: 20,
      textAlign: "center"
    }
  };
  return (
    <div>
      <div style={styles.container2}>
        <a style={styles.cancel} onClick={props.hide}>
          Cancel
        </a>
        <input type="submit" value="Log in" className="LogInBtn" />
      </div>
      <div style={styles.container2}>
        <a style={styles.create} onClick={props.switchDisplay}>
          Create account
        </a>
        <br />
        <a style={styles.create} onClick={props.forgotPassword}>
          Forgot password
        </a>
      </div>
    </div>
  );
};

class LoginView extends Component {
=======
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import FormInput from "../../components/common/FormInput";
class SignUpView extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

>>>>>>> ed67ebb69a5706074e1130033168ee22c903a7ab:app/src/containers/common/LoginForm.js
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: "",
      loading: false
    };
  }

  render() {
    return (
      <div style={styles.background}>
        <div style={styles.closer} onClick={this.props.hide} />
        <div style={styles.container}>
          {this.state.loading && (
            <Spinner loading={true} fillPage color={"black"} />
          )}
          <Header />
          <form name="login" onSubmit={this.submit} style={{ width: "100%" }}>
<<<<<<< HEAD:app/src/components/common/LoginForm.js
            <Inputs />
            <Buttons
              hide={this.props.hide}
              switchDisplay={this.props.switchDisplay}
              forgotPassword={this.forgotPassword}
            />
=======
            <div style={styles.space}>
              Email
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="name@email.com "
              />
            </div>
            <FormInput
              text={"Password"}
              type={"password"}
              name={"password"}
              placeholder={"Password"}
            />

            <div style={styles.container2}>
              <input
                type="cancel"
                value="Cancel"
                className="CancelBtn"
                onClick={this.props.hide}
              />
              <input type="submit" value="Log in" className="LogInBtn" />
            </div>
            <div style={styles.container2}>
              <a style={styles.create} onClick={this.props.switchDisplay}>
                Create account
              </a>

              <a style={styles.create} onClick={this.forgotPassword}>
                Forgot password
              </a>
            </div>
>>>>>>> ed67ebb69a5706074e1130033168ee22c903a7ab:app/src/containers/common/LoginForm.js
          </form>
        </div>
      </div>
    );
  }

  forgotPassword = () => {
    const email = document.forms["login"]["email"].value;
    if (!email) {
      alert("Please fill in email to reset password");
    } else {
      this.setState({ loading: true });
      resetPassword(email).then(() => {
        this.setState({ loading: false });
        alert(`An email has been sent to ${email}`);
      });
    }
  };

  submit = e => {
    e.preventDefault();
    const email = document.forms["login"]["email"].value;
    const password = document.forms["login"]["password"].value;
    const emailDomain = email.split("@")[1];

    if (emailDomain !== "dnb.no") {
      alert("Your email must end with @dnb.no");
    } else {
      this.setState({ loading: true });
      login(email, password)
        .then(() => {
          this.setState({ loading: false });
          if (this.props.navigateTo) {
            this.props.history.push(this.props.navigateTo);
          } else {
            this.props.hide();
          }
        })
        .catch(e => {
          this.setState({ loading: false });
          alert(e.message);
        });
    }
  };
}

const styles = {
  background: {
    backgroundColor: "rgba(0, 52, 64, 0.6)",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 2,
    textAlign: "left"
  },
  container: {
    backgroundColor: "var(--white-three)",
    height: "425px",
    width: "400px",
    padding: 40,
    color: "var(--dark-teal)",
    boxShadow: "0px 5px 10px black",
    zIndex: 4
  },
  closer: {
    height: "100%",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 3
<<<<<<< HEAD:app/src/components/common/LoginForm.js
  }
};

export default LoginView;
=======
  },
  input: {
    width: "100%",
    backgroundColor: "var(--white-three)",
    paddingLeft: 10,
    border: "1px solid var(--dark-teal)"
  },
  container2: {
    marginTop: "3%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  create: {
    cursor: "pointer",
    margin: 20,
    textAlign: "center"
  },
  space: {
    width: "100%",
    marginBottom: 20
  }
};

export default withRouter(SignUpView);
>>>>>>> ed67ebb69a5706074e1130033168ee22c903a7ab:app/src/containers/common/LoginForm.js
