import React, { Component } from "react";
import Lightbox from "react-images";
import "../../resources/Main.css";

//Sets how many pictures are shown if "show more" has not been pressed
const cutoff = 6;

const Container = props => {
  const style = { paddingTop: "40px" };
  return <div style={style}>{props.children}</div>;
};

const Title = props => {
  const style = { textAlign: "left" };
  return <h3 style={style}>Current State</h3>;
};

const ImageContainer = props => {
  return <div class="row">{props.showing}</div>;
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

const Thumbnail = props => {
  const styles = {
    Image: {
      border: "1px solid white",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      overflow: "visible"
    }
  };
  return (
    <div class="Thumbnail col-md-6 col-sm-12 col-lg-4">
      <img style={styles.Image} onClick={props.onClick} src={props.url} />
    </div>
  );
};

class CurrentState extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      showing: [],
      showLightbox: false,
      currentImage: 0,
      lightBoxImages: []
    };

    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
  }

  componentDidMount() {
    const data = this.props.project.thumbnails;
    let items = [];
    if (data) {
      items = data.map((d, i) => (
        <Thumbnail
          onClick={() => {
            this.openLightbox();
            this.setState({ currentImage: i });
          }}
          url={d.url}
        />
      ));
    }

    const lightBoxImages = this.mapToLightbox();
    this.setState({
      images: items,
      showing: items.slice(0, cutoff),
      lightBoxImages
    });
  }

  showAll = () => {
    this.setState({ showing: this.state.images });
  };

  showLess = () => {
    this.setState({ showing: this.state.images.slice(0, cutoff) });
  };

  openLightbox() {
    this.setState({ showLightbox: true });
  }

  closeLightbox() {
    this.setState({ showLightbox: false });
  }
  //TODO: Should only call in componentDidMount
  mapToLightbox = () => {
    return this.props.project.thumbnails.map(d => {
      return { src: d.url };
    });
  };

  render() {
    if (!this.state.images) {
      return <div />;
    }

    return (
      <div>
        <Container>
          <Title />
          <ImageContainer showing={this.state.showing} />
          <ToggleMore
            imagesLength={this.state.images.length}
            showingLength={this.state.showingLength}
          />
        </Container>

        <Lightbox
          images={this.state.lightBoxImages}
          isOpen={this.state.showLightbox}
          backdropClosesModal={true}
          onClose={this.closeLightbox}
          currentImage={this.state.currentImage}
          onClickPrev={() =>
            this.setState({
              currentImage:
                (this.state.currentImage - 1) % this.state.images.length
            })
          }
          onClickNext={() =>
            this.setState({
              currentImage:
                (this.state.currentImage + 1) % this.state.images.length
            })
          }
        />
      </div>
    );
  }
}
const styles = {
  Name: {
    color: "grey"
  }
};

export default CurrentState;
