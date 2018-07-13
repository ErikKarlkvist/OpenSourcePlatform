import React, { Component } from "react";
import {
  getFeatureRequestCount,
  getBugCount,
  getCollaboratorCount
} from "../backend/metrics";
import Button from "./Button";

const Container = props => {
  return (
    <div style={{ width: "100%", marginTop: "20px" }}>{props.children}</div>
  );
};

const Title = props => {
  return <h2 style={{ textAlign: "left" }}>Metrics</h2>;
};

const Metrics = props => {
  const styles = {
    title: {
      fontSize: "20px"
    },
    subtitle: {
      fontSize: "12px",
      fontStyle: "italic"
    }
  };

  return (
    <div className="row" style={{ width: "100%", textAlign: "left" }}>
      <div class="col-md-3 col-sm-12 col-lg-3">
        <h3 style={styles.title}>{props.nmbrOfBugs} Bugs</h3>
        <h6 style={styles.subtitle}>to be fixed</h6>
      </div>
      <div class="col-md-4 col-sm-12 col-lg-4">
        <h3 style={styles.title}>{props.nmbrOfEts} Features</h3>
        <h6 style={styles.subtitle}>to be implemented</h6>
      </div>
      <div class="col-md-5 col-sm-12 col-lg-5">
        <h3 style={styles.title}>{props.nmbrOfBugs} Contributors</h3>
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
      Feel free to take a look at our issues and give an helping hand. Or why
      not give your own suggestion for improvements and commit via Github.
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

const SuggestionLink = props => {
  const styles = {
    container: {
      marginLeft: 20,
      marginTop: 20
    },
    text: {
      color: "white",
      textAlign: "bottom"
    },
    suggestionLink: {
      color: "var(--bluey-green)"
    }
  };
  return (
    <div style={styles.container}>
      <pre style={styles.text}>
        or{"  "}
        <a style={styles.suggestionLink}>Send in a suggestion</a>
      </pre>
    </div>
  );
};

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
    return (
      <Container>
        <Title />
        <Metrics
          nmbrOfBugs={this.state.nmbrOfBugs}
          nmbrOfClb={this.state.nmbrOfClb}
          nmbrOfEts={this.state.nmbrOfEts}
        />
        <InfoText />
        <InputContainer>
          <Button onClick={this.openGit}>
            <h2>Get the code!</h2>
          </Button>
          <SuggestionLink />
        </InputContainer>
      </Container>
    );
  }

  openGit = () => {
    window.location = this.props.gitURL;
  };
}
export default ProjectMetrics;
