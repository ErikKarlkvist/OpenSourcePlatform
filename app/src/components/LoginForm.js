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
          <h1 style={{color:"var(--dark-teal)", textAlign: "center"}}>Log in</h1>
          <form style={{width:"100%"}}>
            <div style={styles.space}>
              Email <br/>      
              <input style={styles.input} type="email" name="email" placeholder="name@email.com "/><br/>
            </div>
            Password:<br/>
            <input style={styles.input} type="password" name="password" placeholder="password" /><br/>
            <br/>
            <div style={styles.container2}>
            <a style= {styles.cancel} onClick={this.props.hide}> Cancel </a>
            <input type="submit" value="Log in" class="LogInBtn"/>
            </div>
            <div style={styles.container2}>
            <a style= {styles.create} onClick={this.props.switchDisplay}>Create account</a>
            <br/>
            </div>
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
    height: "400px",
    width: "400px",
    padding: 40,
    color:"var(--dark-teal)",
    boxShadow: "5px 5px 10px black",
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
    width: "100%",
    backgroundColor: "var(--white-three)",
    paddingLeft: 10,
    border: "1px solid var(--dark-teal)",
  },
  container2:{
    marginTop: "3%",
    width: "100%",
    display:"flex",
    justifyContent: "center",
    alignItems:"center",
  },
  cancel: {
    margin: 20,
    cursor: "pointer"
  },
  create:{
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