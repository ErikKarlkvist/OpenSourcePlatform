import React, { Component } from "react";
import {
  getFeatureRequestCount,
  getBugCount,
  getCollaboratorCount
} from "../backend/metrics";
import "../resources/fonts.css";
import "../resources/colors.css";
class ProjectMetrics extends Component {
  constructor() {
    super();
    this.state = {
      nmbrOfEts: "",
      nmbrOfBugs: "",
      nmbrOfClb: ""
    };
  }

  componentDidMount() {
    getFeatureRequestCount(this.props.gitURL)
      .then(res => {
        this.setState({ nmbrOfEts: res });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          nmbrOfEts: "Couldn't fetch"
        });
      });

    getBugCount(this.props.gitURL)
      .then(res => {
        this.setState({ nmbrOfBugs: res });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          nmbrOfBugs: "Couldn't fetch"
        });
      });

    getCollaboratorCount(this.props.gitURL)
      .then(res => {
        this.setState({ nmbrOfClb: res });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          nmbrOfClb: "Couldn't fetch"
        });
      });
  }

  render() {
    let style = styles.small;
    if (this.props.full) {
      style = styles.full;
    }
    //hooked with login
    return (
      <div style={this.container}>
        <h2 style={styles.HeaderText}>Metrics</h2>
        <div class="row" style={{ width: "100%", textAlign: "left" }}>
          <div class="col-md-3 col-sm-12 col-lg-3">
            <h3 style={styles.title}>{this.state.nmbrOfBugs} Bugs</h3>
            <h6 style={styles.subtitle}>to be fixed</h6>
          </div>
          <div class="col-md-4 col-sm-12 col-lg-4">
            <h3 style={styles.title}>{this.state.nmbrOfEts} Features</h3>
            <h6 style={styles.subtitle}>to be implemented</h6>
          </div>
          <div class="col-md-5 col-sm-12 col-lg-5">
            <h3 style={styles.title}>{this.state.nmbrOfClb} Contributors</h3>
            <h6 style={styles.subtitle}>has added code</h6>
          </div>
        </div>

        <p style={styles.Description}>
          {
            "Feel free to take a look at our issues and give an helping hand. Or why not give your own suggestion for improvements and commit via Github."
          }
        </p>

        <div
          style={{
            display: "inline-flex",
            textAlign: "left",
            width: "100%"
          }}
        >
          <div style={styles.buttonContainer}>
            <button
              onClick={() => {
                this.openGit;
              }}
              className="SeeThroughBtn"
            >
              Get the code!
            </button>
          </div>
          <div
            style={{
              marginLeft: 20,
              marginTop: 20
            }}
          >
            <pre style={{ color: "white", textAlign: "bottom" }}>
              or{"  "}
              <a style={styles.suggestionLink}>Send in a suggestion</a>
            </pre>
          </div>
        </div>
      </div>
    );
  }

  openGit = () => {
    window.location = this.props.gitURL;
  };
}

const styles = {
  container: {
    width: "100%",
    textAlign: "left"
  },
  Description: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
    marginTop: 10
  },
  HeaderText: {
    textAlign: "left",
    width: "100%"
  },
  metrics: {
    display: "flex"
  },
  title: {
    fontSize: "20px"
  },
  subtitle: {
    fontSize: "12px",
    fontStyle: "italic"
  },
  suggestionLink: {
    color: "var(--bluey-green)"
  }
};
export default ProjectMetrics;
