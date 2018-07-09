import React, { Component } from "react";
import "../resources/fonts.css";
import "../resources/colors.css";
import "./AnimatedMenu.css"
class Tools extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      term: ""
    };
  }
  render() {
    if (this.props.tools) {
      return (
        <div style={styles.container}>
          <h6 style={{ textAlign: "center" }}>Tools</h6>
          <ul class="list-unstyled">
            {this.props.tools.map((item, index) => (
              <li style = {{textAlign: "left"}} key={index}>
                <div >
                  <a className={"MenuItem"}  href={item.link}>
                    {item.name}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const styles = {
  container: {
    paddingTop: "12px",
    border: "1px solid white",
    textAlign: "left",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
};
export default Tools;
