import React, { Component } from "react";
import Lightbox from "react-images";
import Thumbnail from "../common/Thumbnail";

//Sets how many pictures are shown if "show more" has not been pressed
const cutoff = 6;

const Container = props => {
  const style = {
    paddingTop: "40px",
    backgroundColor: "var(--light-teal)",
    opacity: "0.8"
  };
  return <div style={style}>{props.children}</div>;
};

const Title = props => {
  const style = { textAlign: "left", color: "var(--dark-teal)"};
  return <h3 style={style}>Updates</h3>;
};

const ImageContainer = props => {
  return <div className="row">{props.showing}</div>;
};

const ToggleMore = props => {
  return (
    <div>
      {props.imagesLength > cutoff &&
        props.showingLength < props.imagesLength && (
          <a onClick={this.showAll}>Show more</a>
        )}
      {props.showingLength > cutoff && (
        <a onClick={this.showLess} style={{ alignSelf: "flex-end" }}>
          Show less
        </a>
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
      backgroundColor: "white"
    }
  };
  return (
    <div style={styles.container} onClick={props.toggleFullScreen}>
      <div style={styles.content}>
        <img src={props.content.url} style={styles.image} />
        <h2 style={styles.title}>{props.content.name}</h2>
        <p style={styles.desc}>{props.content.description}</p>
      </div>
    </div>
  );
};

class Updates extends Component {
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

    console.log("tet");
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
            style={{ marginBottom: 30 }}
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
    this.setState({ showing: this.state.images });
  };

  showLess = () => {
    this.setState({ showing: this.state.images.slice(0, cutoff) });
  };

  //TODO: Should only call in componentDidMount
  mapToLightbox = () => {
    return this.props.project.thumbnails.map(d => {
      return { src: d.url, caption: d.description };
    });
  };

  render() {
    if (!this.state.items) {
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
  }
};
export default Updates;
