import React, { Component } from "react";
import Thumbnail from "../../components/common/Thumbnail";

//Sets how many pictures are shown if "show more" has not been pressed
const cutoff = 4;

const Container = props => {
  const style = {
    paddingTop: "40px",
    backgroundColor: "var(--light-teal-80)"
  };
  return <div style={style}>{props.children}</div>;
};

const Title = props => {
  const style = { textAlign: "left", color: "var(--dark-teal)" };
  return <h3 style={style}>Attachments</h3>;
};

const ImageContainer = props => {
  return <div className="row">{props.showing}</div>;
};

const ToggleMore = props => {
  const styles = {
    text: {
      color: "var(--dark-teal)",
      cursor: "pointer",
      alignSelf: "flex-end"
    },
    container: {
      marginBottom: "15px"
    }
  };
  return (
    <div>
      {props.imagesLength > cutoff &&
        props.showingLength < props.imagesLength && (
          <span onClick={props.showAll} style={styles.text}>
            Show more
          </span>
        )}
      {props.showingLength > cutoff && (
        <span onClick={props.showLess} style={styles.text}>
          Show less
        </span>
      )}
    </div>
  );
};

const FullScreenImage = props => {
  const styles = {
    container: {
      position: "fixed",
      width: "100%",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.8)",
      zIndex: 5,
      top: 0,
      left: 0,

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflowY: "auto"
    },
    content: {
      height: "80vh",
      margin: "20%",
      textAlign: "left",
      backgroundColor: "white"
    },
    image: {
      width: "100%",
      objectFit: "scale-down"
    },
    title: {
      paddingLeft: "5%",
      paddingRight: "5%",
      paddingTop: 10,
      paddingBottom: 10,
      color: "var(--dark-teal)",
      backgroundColor: "white"
    },
    desc: {
      marginTop: -10,
      paddingLeft: "5%",
      paddingRight: "5%",
      paddingTop: 10,
      paddingBottom: 10,
      color: "var(--dark-teal)",
      backgroundColor: "white",
      whiteSpace: "pre-line"
    }
  };
  return (
    <div style={styles.container} onClick={props.toggleFullScreen}>
      <div style={styles.content}>
        <img alt="Attachments" src={props.content.url} style={styles.image} />
        <h2 style={styles.title}>{props.content.name}</h2>
        <p style={styles.desc}>{props.content.description}</p>
      </div>
    </div>
  );
};

class Attachments extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      showing: [],
      showLightbox: false,
      currentItem: 0,
      lightBoxImages: [],
      sizes: [],
      showFullScreen: false
    };
  }

  componentDidMount() {
    this.setupThumbnails();
  }

  toggleFullScreen = index => {
    this.setState((prevState, props) => {
      return { showFullScreen: !prevState.showFullScreen, currentItem: index };
    });
  };

  setupThumbnails(index) {
    const data = this.props.project.thumbnails;
    let items = [];
    if (data) {
      items = data.map((d, i) => {
        return (
          <div
            key={i}
            style={styles.thumbnailStyle}
            className={"col-md-4 col-sm-12 col-lg-3"}
          >
            <Thumbnail
              description={d.description || ""}
              onClick={() => {
                this.toggleFullScreen(i);
              }}
              imgURL={d.url}
              name={d.name}
              size={"small"}
            />
          </div>
        );
      });
    }
    this.setState({
      items,
      showing: items.slice(0, cutoff)
    });
  }

  showAll = () => {
    this.setState({ showing: this.state.items });
  };

  showLess = () => {
    this.setState({ showing: this.state.items.slice(0, cutoff) });
  };

  //TODO: Should only call in componentDidMount
  mapToLightbox = () => {
    return this.props.project.thumbnails.map(d => {
      return { src: d.url, caption: d.description };
    });
  };

  render() {
    if (!this.state.items || this.state.items.length <= 0) {
      return <div />;
    }

    return (
      <div>
        <Container>
          <div className="Center">
            <Title />
            <ImageContainer showing={this.state.showing} />
            <ToggleMore
              imagesLength={this.state.items.length}
              showingLength={this.state.showing.length}
              showAll={this.showAll}
              showLess={this.showLess}
            />
          </div>
        </Container>

        {this.state.showFullScreen && (
          <FullScreenImage
            toggleFullScreen={this.toggleFullScreen}
            content={this.props.project.thumbnails[this.state.currentItem]}
          />
        )}
      </div>
    );
  }
}
const styles = {
  Name: {
    color: "grey"
  },
  thumbnailStyle: {
    marginBottom: 30,
    display: "flex",
    justifyContent: "center"
  }
};
export default Attachments;
