import React, { Component } from "react";
import PropTypes from "prop-types";
import ThumbnailHeads from "./ThumbnailHeads";

/*
* Displays the name and thumbnail image of a project
* On hover, the description of the project is shown
* On click, opens the ProjectPage. This is handled in ProjectDisplay.js
* Classes are from bootstrap
*/

const smallW = "200px";
const mediumW = "300px";

const smallH = "300px";
const mediumH = "600px";

const Container = props => {
  let width = mediumW;
  let height = mediumH;

  if (props.size === "small") {
    width = smallW;
    height = smallH;
  } else if (props.size === "expanded") {
    width = smallW;
    height = "auto";
  }

  const styles = {
    normal: {
      cursor: "pointer",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      width,
      height
    },
    hover: {
      boxShadow: "0 -2px 8px 0 var(--bluey-green)",
      cursor: "pointer",
      width,
      height
    }
  };

  let style = styles.normal;
  if (props.isHovering) {
    style = styles.hover;
  }
  return (
    <div
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      onClick={props.onClick}
      className="card"
      style={style}
    >
      {props.children}
    </div>
  );
};

const Image = props => {
  let width = mediumW;
  let height = mediumW;

  if (props.size === "small" || props.size === "expanded") {
    width = smallW;
    height = smallW;
  }

  const styles = {
    image: {
      marginTop: -1,
      marginLeft: -2,
      width,
      height,
      objectFit: "cover"
    },
    container: {
      width,
      height
    }
  };
  return (
    <div style={styles.container} className="view overlay">
      <img
        className="card-img-top"
        src={props.imgURL}
        alt="Card image cap"
        style={styles.image}
      />
    </div>
  );
};

const Body = props => {
  return <div className="card-body">{props.children}</div>;
};

const Title = props => {
  const style = {
    color: "var(--dark-teal)",
    textAlign: "left"
  };
  if (props.size === "medium") {
    return (
      <h4 style={style} className="card-title">
        {props.name}
      </h4>
    );
  } else {
    return (
      <h5 style={style} className="card-title">
        {props.name}
      </h5>
    );
  }
};

const Description = props => {
  let cutoff = 120;

  let description = props.description;
  if (props.size === "small") {
    cutoff = null;
    description = "";
  } else if (props.size === "expanded") {
    cutoff = 10000;
  }

  const style = {
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "var(--dark-teal)"
  };

  if (description.length > cutoff) {
    description = description.slice(0, cutoff);
    description += "...";
  }

  return (
    <p style={style} className="card-text">
      {description}
    </p>
  );
};

const ReadMore = props => {
  const style = {
    marginRight: "10px",
    color: "var(--dark-teal)",
    textDecoration: "underline",
    position: "absolute",
    width: "100px",
    right: -8,
    bottom: 0
  };
  return (
    <div style={style} href="#!">
      <h6 style={style}>Read more</h6>
    </div>
  );
};

const Hover = props => {
  const style = {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  };

  if (props.isHovering) {
    return <div style={style} />;
  } else {
    return <div />;
  }
};

class Thumbnail extends Component {
  static propTypes = {
    imgURL: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  };

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
  onMouseOver = e => {
    this.setState({ isHovering: true });
  };

  onMouseOut = e => {
    this.setState({ isHovering: false });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.project !== nextProps.project) {
      this.setState({ text: nextProps.project.name });
    }
  }

  render() {
    if (this.props.imgURL === undefined) {
      return <div />;
    }
    return (
      <Container
        isHovering={this.state.isHovering}
        onClick={this.props.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        size={this.props.size}
      >
        <Image imgURL={this.props.imgURL} size={this.props.size} />
        <Body>
          <Title name={this.props.name} size={this.props.size} />

          {/*hr somehow renders a line between title and description, don't show if small*/}
          {this.props.size !== "small" && <hr />}

          <Description
            description={this.props.description}
            size={this.props.size}
          />
          {this.props.renderHeads && (
            <ThumbnailHeads owners={this.props.owners} />
          )}
        </Body>
        <ReadMore />
      </Container>
    );
  }
}

export default Thumbnail;
