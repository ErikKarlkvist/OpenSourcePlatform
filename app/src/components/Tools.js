import React, { Component } from "react";
import "../resources/fonts.css"
import "../resources/colors.css"
class Tools extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      term: '',
    };
  }


  render() {
    if(this.props.tools){
      return (
        <div style = {styles.container}>
          <h3>Tools</h3>
          <ul class="list-unstyled" >
            {
              this.props.tools.map((item, index) => 
                <li key={index}>
                  <a href={item.link}>
                    <h5 style ={{textAlign: "left"}}>
                      {item.name}
                    </h5> 
                  </a>
                </li>
              )
            }
          </ul>
        </div>
      );
    } else {
      return <div/>
    }
  }
}

const styles= {
  container: {
    paddingTop: "12px",
    border: "2px solid white",
    maxWidth: "80px",
    maxHeight: "200px",
    textAlign: "left",

  }
}
export default Tools;