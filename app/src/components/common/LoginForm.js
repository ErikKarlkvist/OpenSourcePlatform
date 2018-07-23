import React, { Component } from "react";
import Spinner from "../common/Spinner";
import { login, resetPassword } from "../../backend/auth";

class SignUpView extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: "",
      loading: false
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

  render() {
    return (
      <div style={styles.background}>
        <div style={styles.closer} onClick={this.props.hide} />
        <div style={styles.container}>
          {this.state.loading && (
            <Spinner loading={true} fillPage color={"black"} />
          )}
          <h1 style={{ color: "var(--dark-teal)", textAlign: "center" }}>
            Log in
          </h1>
          <form name="login" onSubmit={this.submit} style={{ width: "100%" }}>
            <div style={styles.space}>
              Email <br />
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="name@email.com "
              />
              <br />
            </div>
            Password:<br />
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="password"
            />
            <br />
            <br />
            <div style={styles.container2}>
              <input type="cancel" value="Cancel" className="CancelBtn" onClick={this.props.hide}/>
              <input type="submit" value="Log in" className="LogInBtn" />
            </div>
            <div style={styles.container2}>
              <a style={styles.create} onClick={this.props.switchDisplay}>
                Create account
              </a>
              <br />
              <a style={styles.create} onClick={this.forgotPassword}>
                Forgot password
              </a>
            </div>
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
    height: "425px",
    width: "400px",
    padding: 40,
    color: "var(--dark-teal)",
    boxShadow: "5px 5px 10px black",
    zIndex: 4
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

export default SignUpView;
