import React, { Component } from "react";
import "../resources/colors.css";
import ThumbnailHeads from "./ThumbnailHeads";

/*
* Displays the name and thumbnail image of a project
* On hover, the description of the project is shown
* On click, opens the ProjectPage. This is handled in ProjectDisplay.js
*/

const Container = props => {
  const style = {
    height: "300px",
    width: "300px",
    position: "relative",
    border: "solid 3px #ffffff",
    backgroundColor: "rgba(0, 52, 62, 1)",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, .5)"
  };
  return <div style={style}>{props.children}</div>;
};

const BackgroundImage = props => {
  const style = {
    position: "relative",
    opacity: 0.5,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  };
  return <img style={style} src={props.imgURL} />;
};

const Title = props => {
  const style = {
    position: "absolute",
    left: "50%",
    top: "30%",
    transform: "translate(-50%, -50%)",

    color: "white",
    fontSize: "34px",
    fontFamiliy: "FedraSans",
    textShadow: "1px 1px 1px black"
  };
  return <span style={style}>{props.name}</span>;
};

const Ingress = props => {
  const style = {
    position: "absolute",
    bottom: 0,
    paddingLeft: "5px",
    paddingRight: "5px",
    textOverflow: "ellipsis",
    textAlign: "left",
    backgroundColor: "rgba(256, 256, 256, 0.85)",
    backdropFilter: "blur(1.4px)",
    color: "black",
    height: "35%",
    width: "100%"
  };

  return (
    <div style={style}>
      {props.description.length > 120 ? (
        <div>{props.description.slice(0, 120)}...</div>
      ) : (
        <div>{props.description}</div>
      )}
    </div>
  );
};

class Thumbnail extends Component {
  constructor() {
    super();
    this.state = {
      isHovering: false,
      project: {}
    };
  }
  componentDidMount() {
    this.setState({ project: this.props.project });
  }
  onMouseOver(e) {
    this.setState({ isHovering: true });
  }

  onMouseOut(e) {
    this.setState({ isHovering: false });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.project !== nextProps.project) {
      this.setState({ text: nextProps.project.name });
    }
  }

  render() {
    if (this.props.project === undefined) {
      return <div />;
    }
    return (
      <Container>
        <BackgroundImage imgURL={this.props.imgURL} />
        <div>
          <Title name={this.props.name} />
          {this.props.renderHeads && (
            <ThumbnailHeads owners={this.props.owners} />
          )}
          <Ingress description={this.props.description} />
        </div>

        {/*
        {this.state.isHovering && (
          <div className={"description"}>
            <h4 className={"descText"}>{this.props.project.name}</h4>
            <p className={"descText"}>{this.props.project.description}</p>
            <p style={styles.BottomText}>Read More</p>
          </div>
        )}
      */}
      </Container>
    );
  }
}

export default Thumbnail;

const styles = {
  /*
  BottomText: {
    textAlign: "right",
    position: "absolute",
    right: "5%",
    top: "20px"
  },
  */
};
