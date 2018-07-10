import React, { Component } from "react";
import Lightbox from "react-images";
import "./CurrentState.css";

//Sets how many pictures are shown if "show more" has not been pressed
const cutoff = 6;

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
      items = data.map(d => (
        <div class="Thumbnail col-md-6 col-sm-12 col-lg-4">
          <img style={styles.Image} onClick={this.openLightbox} src={d.url} />
        </div>
      ));
    }

    const lightBoxImages = this.mapToLightbox()
    this.setState({ images: items, showing: items.slice(0, cutoff), lightBoxImages });
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
        <div className="currentStateContainer">
          <h2 style={styles.Header}>Current State</h2>
          <div class="row">{this.state.showing}</div>

          {this.state.images.length > cutoff &&
            this.state.showing.length < this.state.images.length && (
              <a onClick={this.showAll}>Show more</a>
            )}
          {this.state.showing.length > cutoff && (
            <a onClick={this.showLess} className="ShowLess">
              Show less
            </a>
          )}
        </div>
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
  Image: {
    border: "1px solid white",
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  Name: {
    color: "grey"
  },
  Header: {
    textAlign: "left"
  }
};

export default CurrentState;
