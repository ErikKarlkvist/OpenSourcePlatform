import React, { Component } from "react";
import "../resources/fonts.css";
import "../resources/colors.css";
import "../resources/Main.css";
import { register } from "../backend/auth";
import Spinner from "./Spinner";

class SignUpView extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: "",
      loading: false,
      validEmail: true
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  checkEmail = e => {
    const split = e.split("@");
    console.log("EMAIL", e, split, split.length === 2 && split[1] == "dnb.no");
    this.setState({ validEmail: split.length === 2 && split[1] == "dnb.no" });
  };

  render() {
    return (
      <div style={styles.background}>
        <div style={styles.closer} onClick={this.props.hide} />
        <div style={styles.container}>
          {this.state.loading && (
            <Spinner loading={true} fillPage color={"black"} />
          )}
          <h1 style={{ color: "var(--dark-teal)", textAlign: "center" }}>
            Sign up
          </h1>
          <form name="signup" onSubmit={this.submit} style={{ width: "100%" }}>
            <br />
            <div style={styles.space}>
              Firstname<br />
              <input
                style={styles.input}
                type="text"
                name="firstname"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div style={styles.space}>
              Lastname<br />
              <input
                style={styles.input}
                type="text"
                name="lastname"
                placeholder="Enter your lastname"
                required
              />
            </div>
            <div style={styles.space}>
              Email<br />
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="Enter a valid @dnb.no email address"
                pattern="[^@\s]+@dnb.no+"
                customValidity
                onBlur={e => this.checkEmail(e.target.value)}
                required
              />
              {!this.state.validEmail && (
                <div>
                  <p style={{ color: "red" }}>Must be an @dnb.no email</p>
                </div>
              )}
            </div>
            <div style={styles.space}>
              Password<br />
              <input
                style={styles.input}
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
              <br />
            </div>
            <div style={styles.container2}>
              <a style={styles.cancel} onClick={this.props.hide}>
                {" "}
                Cancel{" "}
              </a>
              <input type="submit" value="Sign up" class="LogInBtn" />
            </div>
            <div style={styles.container2}>
              <a style={styles.gotoLogin} onClick={this.props.switchDisplay}>
                Go to login
              </a>
              <br />
            </div>
          </form>
        </div>
      </div>
    );
  }

  submit = e => {
    e.preventDefault();
    const firstname = document.forms["signup"]["firstname"].value;
    const lastname = document.forms["signup"]["lastname"].value;
    const email = document.forms["signup"]["email"].value;
    const password = document.forms["signup"]["password"].value;

    const emailDomain = email.split("@")[1];

    if (emailDomain !== "dnb.no") {
      alert("Your email must end with @dnb.no");
    } else {
      this.setState({ loading: true });
      register(firstname, lastname, email, password)
        .then(() => {
          this.setState({ loading: false });
          this.props.hide();
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
    height: "600px",
    width: "400px",
    padding: 40,
    color: "var(--dark-teal)",
    zIndex: 4,
    boxShadow: "5px 5px 10px black"
  },
  container2: {
    marginTop: "3%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    marginBottom:10
  },
  closer: {
    height: "100%",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 3
  },
  input: {
    marginTop: 5,
    width: "100%",
    backgroundColor: "var(--white-three)",
    paddingLeft: 10,
    border: "1px solid var(--dark-teal)"
  },
  cancel: {
    margin: 20,
    cursor: "pointer"
  },
  gotoLogin: {
    cursor: "pointer",
    margin: 20,
    textAlign: "center"
  },
  space: {
    width: "100%",
    marginBottom: 20
  }
};

export default SignUpView;
