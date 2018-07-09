import React, { Component } from "react";
import "./AnimatedMenu.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

class LoginRegister extends Component {

  constructor(){
    super();
    this.state = {
      displaySignup: false,
      displayLogin: false,
    }
  }

  render() {
    //hooka med login
    if(!this.props.isLoggedIn){
      return (
        <div>
          {this.state.displayLogin && <LoginForm hide = {this.hide} switchDisplay={this.switchDisplay}/>}
          {this.state.displaySignup && <SignupForm hide = {this.hide} switchDisplay={this.switchDisplay}/>}
          <div>
            <a className={"MenuItem"} onClick={() => this.setState({displaySignup:true})} >
              Sign up
           </a>
           <a> | </a>
           <a className={"MenuItem"} onClick={() => this.setState({displayLogin:true})} >
              Log in
           </a>
          </div>
          <div style={styles.line}/>
        </div>
      );
    } else {
      return (
        <div style={styles.container}>
          <h5>Welcome {this.props.user.firstname} {this.props.user.lastname}</h5>
          <div style={styles.line}/>
        </div>
      )
    }
  }

  switchDisplay = () => {
    if(this.state.displaySignup){
      this.setState({
        displaySignup: false,
        displayLogin: true,
      })
    } else {
      this.setState({
        displaySignup: true,
        displayLogin: false,
      })
    }
  }

  hide = (shouldHide) => {
    this.setState({
      displaySignup: false,
      displayLogin: false,
    })
  }
}

const styles = {
  line: {
    borderBottom: '1px solid white',
    height: "20px",
    width: "120px",
    marginLeft: "50px",
    marginRight: "-20px"
  },
  container: {
    display:"flex",
    alignItems:"right"
  }
}
export default LoginRegister;
