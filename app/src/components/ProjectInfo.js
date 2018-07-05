import React, { Component } from "react";
import "./ProjectInfo.css";
import Tools from "./Tools.js";

class ProjectInfo extends Component {
  joinProject(name) {
    console.log("Let me join", name, "please");
    return;
  }

  render() {
    return (
      <div style={styles.InfoContainer}>
        <div class="row" style={{ marginRight: "0px" }}>
          <div style={styles.Description} class="col-md-9 col-sm-12 col-lg-9">
            {this.props.project.description}
          </div>
          <div style={styles.Sidebar} class="col-md-2 col-sm-12 col-lg-2">
            <div class="row">
              <div class="col-md-12 col-sm-6 col-lg-12">
                <div>
                  <div style={{ textAlign: "center", marginBottom: "-10px" }}>
                    <h6>Contact</h6>
                  </div>
                  <a href={"mailto:" + "xyz@dnb.no"}>
                    <h3
                      style={{
                        textDecoration: "underline",
                        textAlign: "center"
                      }}
                    >
                      xyz.dnb.no
                    </h3>
                  </a>
                </div>
                {/*replace with this.props.project.contactMail when that is implemented*/}
              </div>
              <div class="col-md-12 col-sm-6 col-lg-12">
                <button
                  className="JoinProjectBtn"
                  onClick={this.joinProject(this.props.project.name)}
                >
                  <h6>Join Project</h6>
                </button>
              </div>

              <div
                class="col-md-12 col-sm-12 col-lg-12"
                style={{ paddingTop: "20px" }}
              >
                <Tools tools={this.props.project.tools} />
              </div>
            </div>
          </div>
        </div>
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
  }
};
