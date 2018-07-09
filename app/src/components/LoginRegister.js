import React, { Component } from "react";
import "./AnimatedMenu.css";
import LoginForm from "./LoginForm";

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
          {this.state.displayLogin && <LoginForm hide = {this.hide}/>}
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
