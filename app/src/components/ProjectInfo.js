import React, { Component } from "react";
import "./ProjectInfo.css";

class ProjectInfo extends Component {
  joinProject(name) {
    console.log("Let me join", name, "please");
    return;
  }

  render() {
    return (
      <div style={styles.InfoContainer}>
        <div class="row">
          <div style={styles.Description} class="col-md-8 col-sm-12 col-lg-8">
            {this.props.project.description}
          </div>
          <div style={styles.Sidebar} class="col-md-4 col-sm-12 col-lg-4">
            <div class="row">
              <div class="col-md-12 col-sm-6 col-lg-12">
                <button
                  className="JoinProjectBtn"
                  onClick={this.joinProject(this.props.project.name)}
                >
                  Join Project
                </button>
              </div>
              <div class="col-md-12 col-sm-6 col-lg-12">
                {"Contact\n"}
                <a href={"mailto:" + "xyz@dnb.no"}>xyz.dnb.no</a>
                {/*replace with this.props.project.contactMail when that is implemented*/}
              </div>
              <div class="col-md-12 col-sm-12 col-lg-12">Tools</div>
            </div>
          </div>
        </div>
        <div style={styles.Contributors}> Contributors</div>
      </div>
    );
  }
}

export default ProjectInfo;

const styles = {
  Description: {
    color: "white",
    fontSize: 18
  },
  InfoContainer: {
    paddingLeft: "5%",
    fontSize: 30
  },
  Sidebar: {
    color: "white",
    justifyContent: "center",
    alignItems: "right"
  },
  Contributors: {
    marginTop: "30px"
  }
};
