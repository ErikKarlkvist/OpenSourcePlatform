import React, { Component } from "react";
import {
  getFeatureRequestCount,
  getBugCount,
  getCollaboratorCount
} from "../../backend/metrics";
import Button from "../../components/common/Button";

const Container = props => {
  return <div style={{ width: "100%" }}>{props.children}</div>;
};

const Title = props => {
  return <h3 style={{ textAlign: "left" }}>Metrics</h3>;
};

const Metrics = props => {
  const styles = {
    subtitle: {
      fontSize: "12px",
      fontStyle: "italic"
    }
  };

  return (
    <div className="row" style={{ width: "100%", textAlign: "left" }}>
      <div className="col-md-3 col-sm-12 col-lg-3">
        <h4 style={styles.title}>{props.nmbrOfBugs} Bugs</h4>
        <h6 style={styles.subtitle}>to be fixed</h6>
      </div>
      <div className="col-md-4 col-sm-12 col-lg-4">
        <h4 style={styles.title}>{props.nmbrOfEts} Features</h4>
        <h6 style={styles.subtitle}>to be implemented</h6>
      </div>
      <div className="col-md-5 col-sm-12 col-lg-5">
        <h4 style={styles.title}>{props.nmbrOfBugs} Contributors</h4>
        <h6 style={styles.subtitle}>has added code</h6>
      </div>
    </div>
  );
};

const InfoText = props => {
  const style = {
    color: "white",
    fontSize: 16,
    textAlign: "left",
    marginTop: 10
  };

  return (
    <p style={style}>
      Feel free to take a look at our issues and give a helping hand. Or why not
      give your own suggestion for improvements and commit via Github.
    </p>
  );
};

const InputContainer = props => {
  return (
    <div
      style={{
        display: "inline-flex",
        textAlign: "left",
        width: "100%"
      }}
    >
      {props.children}
    </div>
  );
};

class ProjectMetrics extends Component {
  constructor() {
    super();
    this.state = {
      nmbrOfEts: "",
      nmbrOfBugs: "",
      nmbrOfClb: "",
      foundProject: false
    };
  }

  componentDidMount() {
    getFeatureRequestCount(this.props.gitURL)
      .then(res => {
        this.setState({ nmbrOfEts: res, foundProject: true });
      })
      .catch(e => {
        this.setState({
          nmbrOfEts: "Couldn't fetch",
          foundProject: false
        });
      });

    getBugCount(this.props.gitURL)
      .then(res => {
        this.setState({ nmbrOfBugs: res, foundProject: true });
      })
      .catch(e => {
        this.setState({
          nmbrOfBugs: "Couldn't fetch",
          foundProject: false
        });
      });

    getCollaboratorCount(this.props.gitURL)
      .then(res => {
        this.setState({ nmbrOfClb: res, foundProject: true });
      })
      .catch(e => {
        this.setState({
          nmbrOfClb: "Couldn't fetch",
          foundProject: false
        });
      });
  }

  render() {
    if (this.props.gitURL) {
      return (
        <Container>
          <Title />
          {this.state.foundProject && (
            <Metrics
              nmbrOfBugs={this.state.nmbrOfBugs}
              nmbrOfClb={this.state.nmbrOfClb}
              nmbrOfEts={this.state.nmbrOfEts}
            />
          )}
          {!this.state.foundProject && (
            <h3>Error fetching metrics - bad url?</h3>
          )}
          <InfoText />
          <InputContainer>
            <Button
              solidBtn={true}
              onClick={this.openGit}
              style={{ marginRight: "10px" }}
            >
              Get the code!
            </Button>
            <Button style={{ width: "170px" }} onClick={this.openIssues}>
              Add a suggestion
            </Button>
          </InputContainer>
        </Container>
      );
    } else {
      return <div />;
    }
  }

  openGit = () => {
    const win = window.open(this.props.gitURL, "_blank");
    win.focus();
  };

  openIssues = () => {
    const url = this.props.gitURL + "/issues";
    const win = window.open(url, "_blank");
    win.focus();
  };
}
export default ProjectMetrics;
