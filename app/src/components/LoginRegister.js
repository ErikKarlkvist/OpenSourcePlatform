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
  }

  hide = () => {
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
}
export default LoginRegister;

