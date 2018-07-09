import React, { Component } from "react";
import "../resources/fonts.css";
import "../resources/colors.css";
import "../resources/Main.css";

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
          <h1 style={{color:"var(--dark-teal)", textAlign: "center"}}>Sign up</h1>
          <form action={() => {this.submit}} style={{width:"100%"}}>
            <br/>
            <input style={styles.input} type="text" name="firstname" placeholder="Enter your first name"/><br/>
            <br/>
            <input style={styles.input} type="text" name="lastname" placeholder="Enter your lastname"/><br/>
            <br/>
            <input style={styles.input} type="email" name="email" placeholder="Enter your e-mail"/><br/>
           	<br/>
            <input style={styles.input} type="password" name="password" placeholder="Enter your password"/><br/>
			<div style={styles.container2}>
            	<a style= {styles.cancel} onClick={this.props.hide}> Cancel </a>
            	<input type="submit" value="Sign up" class="LogInBtn"/>
            </div>
            <div style={styles.container2}>
            <a style= {styles.gotoLogin} onClick={this.props.switchDisplay}>Go to login</a>
            <br/>
            </div>
          </form>
        </div>
      </div>
    );
  }

  submit = () => {
  	console.log("test")
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
    backgroundColor: "rgba(0, 52, 64, 0.6)",
    height: "100%",
    width: "100%",
    display:"flex",
    justifyContent: "center",
    alignItems:"center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 2,
    textAlign: "left",
    
  },
  container: {
    backgroundColor: "var(--white-three)",
    height: "500px",
    width: "400px",
    padding: 40,
    color:"var(--dark-teal)",
    zIndex: 4,
    boxShadow: "5px 5px 10px black"
  },
  container2:{
  	marginTop:"5%",
  	width: "100%",
    display:"flex",
    justifyContent: "center",
    alignItems:"center",
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
  	marginTop: 5,
    width: "100%",
    backgroundColor: "var(--white-three)",
    paddingLeft: 10,
    border: "1px solid var(--dark-teal)",
  },
  cancel:{
    margin: 20,
    cursor: "pointer",
  },
  gotoLogin:{
  	cursor: "pointer",
    margin:20,
    textAlign:"center",
  },
  space:{
    width: "100%",
    marginBottom:20,
  },

};


export default SignUpView;