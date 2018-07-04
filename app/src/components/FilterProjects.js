import React, { Component } from "react";
import "./FilterProjects.css"

class FilterProjects extends Component {
  constructor(){
    super();
    //picked is either "all" "live" or "graduate"
    this.state={
      picked: "all"
    }
  }

  render() {
    console.log(this.state.picked)
    let liveStyle = "";
    let allStyle = "";
    let graduateStyle = "";

    if(this.state.picked === "all"){
      liveStyle ="MenuItem";
      allStyle = "MenuItem UnderlinedMenuItem"
      graduateStyle = "MenuItem"
    } else if(this.state.picked === "live"){
      liveStyle ="MenuItem UnderlinedMenuItem";
      allStyle = "MenuItem"
      graduateStyle = "MenuItem"
    } else {
      liveStyle ="MenuItem";
      allStyle = "MenuItem"
      graduateStyle = "MenuItem UnderlinedMenuItem"
    }

  	return(
  		<div >
	  		<a className={allStyle} href="#" onClick={() => this.setStyle("all")}>
				  All Projects
			 </a>
       <a className={liveStyle} href="#" onClick={() => this.setStyle("live")}>
          Live Projects
       </a>
       <a className={graduateStyle} href="#" onClick={() => this.setStyle("graduate")}>
          Graduated Projects
       </a>
  		</div>
    );
  }

  setStyle = (picked) => {
    this.setState({picked: picked})
    console.log(picked)
    this.props.changeFilter(picked)
  }
}

/*<div onChange={this.setGender.bind(this)}>
        	<input type="radio" value="MALE" name="gender" defaultChecked={this.props.value ==="MALE"} /> Male
        	<input type="radio" value="FEMALE" name="gender" defaultChecked={this.props.value ==="FEMALE"}/> Female
    	</div>*/
export default FilterProjects;