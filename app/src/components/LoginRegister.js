import React, { Component } from "react";

class LoginRegister extends Component {
  render() {
    //hooka med login
    return (
      <div>
        <a>Sign up | Log in</a>
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
