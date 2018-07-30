import React, { Component } from "react";
import { register } from "../../backend/auth";
import Spinner from "../../components/common/Spinner";
import FormInput from "../../components/common/FormInput";

const Header = () => {
  const style = {
    color: "var(--dark-teal)",
    textAlign: "center",
    marginTop: "4%"
  };
  return <h1 style={style}>Sign up</h1>;
};

const Disclaimer = () => {
  const styles = {
    link: {
      fontSize: "11px",
      color: "var(--dark-teal)",
      fontStyle: "italic"
    },
    disclaimer: {
      marginTop: "10px",
      fontSize: "11px"
    }
  };
  return (
    <div style={styles.disclaimer}>
      {"By signing up to this website, you agree to DNB's "}
      <a
        style={styles.link}
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.dnb.no/global/generelle-vilkar.html"
      >
        {"General terms "}
      </a>
      {"and "}
      <a
        style={styles.link}
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.dnb.no/om-oss/personvern.html"
      >
        {"Personal privacy policy "}
      </a>
    </div>
  );
};

const InvalidEmailText = () => {
  const style = {
    color: "var(--bright-orange",
    fontStyle: "italic",
    fontSize: "14px"
  };
  return (
    <div>
      <p style={style}>Not a valid email. Must end with @dnb.no</p>
    </div>
  );
};

class SignUpView extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      loading: false,
      validEmail: true
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  //Show text if the input box is blurred with an incorrect email, remove text immediately if the user enters a correct address
  checkEmail = (e, onChange) => {
    const split = e.split("@");
    let valid = split.length === 2 && split[1] === "dnb.no";
    if (onChange) {
      if (!this.state.validEmail) {
        this.setState({ validEmail: valid });
      }
    } else {
      this.setState({ validEmail: valid });
    }
  };

  render() {
    return (
      <div style={styles.background}>
        <div style={styles.closer} onClick={this.props.hide} />
        <div style={styles.container}>
          {this.state.loading && (
            <Spinner loading={true} fillPage color={"black"} />
          )}
          <Header />

          <form name="signup" onSubmit={this.submit} style={{ width: "100%" }}>
            <FormInput
              text={"First name"}
              name={"firstname"}
              placeholder={"Enter your first name"}
            />
            <FormInput
              text={"Last name"}
              name={"lastname"}
              placeholder={"Enter your last name"}
            />
            <FormInput
              text="Email"
              name="email"
              placeholder="Enter a valid email@dnb.no address"
              onBlur={e => this.checkEmail(e.target.value, false)}
              onChange={e => this.checkEmail(e.target.value, true)}
            />

            {!this.state.validEmail && <InvalidEmailText />}
            <FormInput
              text={"Password"}
              name={"password"}
              type={"password"}
              placeholder={"Enter your password"}
            />

            <FormInput
              text={"Confirm password"}
              name={"confirmPassword"}
              type={"password"}
              placeholder={"Confirm your password"}
              required
            />
            <Disclaimer />
            <div style={styles.container2}>
              <input
                type="cancel"
                value="Cancel"
                className="CancelBtn"
                onClick={this.props.hide}
              />
              <input type="submit" value="Sign up" className="LogInBtn" />
            </div>
            <div style={styles.container2}>
              <a style={styles.gotoLogin} onClick={this.props.switchDisplay}>
                Go to login
              </a>
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
    const confirmPassword = document.forms["signup"]["confirmPassword"].value;

    const emailDomain = email.split("@")[1];

    if (emailDomain !== "dnb.no") {
      alert("Your email must end with @dnb.no");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
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
    textAlign: "left",
    overflowY: "auto"
  },
  container: {
    backgroundColor: "var(--white-three)",
    height: "700px",
    width: "400px",
    padding: 40,
    color: "var(--dark-teal)",
    zIndex: 4,
    boxShadow: "0px 5px 10px black"
  },
  container2: {
    marginTop: "3%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
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
    marginTop: "5px",
    width: "100%",
    backgroundColor: "var(--white-three)",
    paddingLeft: 10,
    border: "1px solid var(--dark-teal)"
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
