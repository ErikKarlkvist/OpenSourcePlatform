import React, { Component } from "react";
import PropTypes from "prop-types";
import "../resources/colors.css";
import ThumbnailHeads from "./ThumbnailHeads";

/*
* Displays the name and thumbnail image of a project
* On hover, the description of the project is shown
* On click, opens the ProjectPage. This is handled in ProjectDisplay.js
*/

const Container = props => {
  const styles = {
    normal: {
      cursor: "pointer",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      height: "500px",
      width: "300px"
    },
    hover: {
      boxShadow: "0 -2px 8px 0 var(--bluey-green)",
      cursor: "pointer",
      height: "500px",
      width: "300px"
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
      class="card"
      style={style}
    >
      {props.children}
    </div>
  );
};

const Image = props => {
  const styles = {
    image: {
      marginTop: -1,
      marginLeft: -1,
      width: "101%",
      height: "300px",
      objectFit: "cover"
    },
    container: {
      width: "100%",
      height: "300px"
    }
  };
  return (
    <div style={styles.container} class="view overlay">
      <img
        class="card-img-top"
        src={props.imgURL}
        alt="Card image cap"
        style={styles.image}
      />
    </div>
  );
};

const Body = props => {
  return <div class="card-body">{props.children}</div>;
};

const Title = props => {
  const style = {
    color: "var(--dark-teal)",
    textAlign: "left"
  };

  return (
    <h4 style={style} class="card-title">
      {props.name}
    </h4>
  );
};

const Description = props => {
  const style = {
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "var(--dark-teal)"
  };

  let description = props.description;
  if (description.length > 120) {
    description = description.slice(0, 120);
    description += "...";
  }
  return (
    <p style={style} class="card-text">
      {description}
    </p>
  );
};

const ReadMore = props => {
  const style = {
    marginRight: "10px",
    color: "var(--dark-teal)"
  };
  return (
    <a style={style} href="#!" class="black-text d-flex justify-content-end">
      <h5 style={style}>Read more</h5>
    </a>
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
    name: PropTypes.string.isRequired
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
      >
        <Image imgURL={this.props.imgURL} />
        <Body>
          <Title name={this.props.name} />
          <hr />
          <Description description={this.props.description} />
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
