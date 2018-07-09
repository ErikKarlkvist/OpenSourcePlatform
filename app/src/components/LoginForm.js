import React, { Component } from "react";
import {Form, FormGroup, ControlLabel, FormControl, Col,Checkbox, Button} from 'react-bootstrap';
import "../resources/fonts.css";
import "../resources/colors.css";

class SignUpView extends Component {
 constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div style={styles.background} >
        <div style={styles.closer} onClick={this.props.hide}/>
        <div style={styles.container} >
          <h1 style={{color:"black", textAlign: "center"}}>Log in</h1>
          <form style={{width:"100%"}}>
            First name:<br/>
            <input style={styles.input} type="text" name="firstname"/><br/>
            Last name:<br/>
            <input type="lastname" name="lastname"/><br/>
            Password:<br/>
            <input type="password" name="lastname"/><br/>

            <input type="submit" value="Log in"/>
          </form>
        </div>
      </div>
    );
  }
}
function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
};

const styles = {
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    height: "100%",
    width: "100%",
    display:"flex",
    justifyContent: "center",
    alignItems:"center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  container: {
    backgroundColor: "white",
    height: "400px",
    width: "400px",
    padding: 40,
    color:"var(--dark-teal)",
    zIndex: 4,
  },
  closer: {
    height: "100%",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 3,
  },
  input: {
    width: "100%"
  }

};


export default SignUpView;