import React, { Component } from "react";
import "./AnimatedMenu.css";

class LoginRegister extends Component {
  render() {
    //hooka med login
    return (
      <div>
        <div>
          <a className={"MenuItem"} href="#" >
            Sign up
         </a>

         <a> | </a>
         <a className={"MenuItem"} href="#" >
            Log in
         </a>
        </div>
        <div style={styles.line}/>
      </div>
    );
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

