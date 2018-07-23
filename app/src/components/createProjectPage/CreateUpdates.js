import React, { Component } from "react";
import Line from "../common/Line.js";
import CreateUpdatePost from "./CreateUpdatePost";
import Thumbnail from "../common/Thumbnail";

const Container = props => {
  const style = {
    textAlign: "left",
    marginTop: "80px",
    paddingBottom: "80px",
    backgroundColor: "var(--light-teal)",
    opacity: "0.8"
  };
  return <div style={style}>{props.children}</div>;
};

const Title = props => {
  const style = { paddingTop: "50px", color: "var(--dark-teal)"};
  return <h3 style={style}>Updates</h3>;
};

const ThumbnailUpload = props => {
  const styles = {
    container: {
      width: "200px",
      minHeight: "350px",
      border: "solid 1px gray",
      backgroundColor: "white"
    },
    circle: {
      width: "200px",
      height: "300px",
      border: "solid 1px white",
      cursor: "pointer",
      borderRadius: "5px",
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    plus: {
      color: "var(--dark-teal)",
      fontSize: "80px",
      marginTop: "20px",
      fontFamily: "FedraSansLight"
    }
  };
  return (
    <div style={styles.circle} onClick={() => props.addNewThumbnail()}>
      <p style={styles.plus}>+</p>
    </div>
  );
};

class AddThumbnails extends Component {
  constructor() {
    super();
    this.state = {
      thumbnails: []
    };
  }

  recieveURL = (url, i) => {
    const { thumbnails } = this.state;

    if (thumbnails[i]) {
      thumbnails[i].url = url;
    } else {
      thumbnails[i] = { url };
    }

    this.setState({ thumbnails });
  };

  toggleFullScreen = index => {
    this.setState((prevState, props) => {
      return { showFullScreen: !prevState.showFullScreen, currentItem: index };
    });
  };

  addThumbnail = thumbnail => {
    const { thumbnails } = this.state;
    thumbnails.push(thumbnail);
    this.props.setThumbnails(thumbnails);
    this.setState({ thumbnails });
    this.toggleFullScreen(null);
  };

  removeThumbnail = () => {
    if (this.state.currentItem !== null) {
      let { thumbnails } = this.state;
      thumbnails.splice(this.state.currentItem, 1);
      this.props.setThumbnails(thumbnails);
      this.setState({ thumbnails });
    }
    this.toggleFullScreen(null);
  };

  render() {
    const thumbnailsToShow = this.getThumbnailsToShow();

    return (
      <Container>
        <Line full={true} />
        <div className="Center">
          <Title />
          <div className="row">
            {thumbnailsToShow}
            {this.state.showFullScreen && (
              <CreateUpdatePost
                toggleFullScreen={this.toggleFullScreen}
                projectID={this.props.projectID}
                data={this.state.thumbnails[this.state.currentItem]}
                addThumbnail={this.addThumbnail}
                removeThumbnail={this.removeThumbnail}
              />
            )}
          </div>
        </div>
      </Container>
    );
  }

  getThumbnailsToShow() {
    const { thumbnails } = this.state;
    const thumbnailsToShow = [];
    for (let i = 0; i < thumbnails.length; i++) {
      const data = thumbnails[i];
      thumbnailsToShow.push(
        <div class={"col-md-3 col-sm-12 col-lg-3"}>
          <Thumbnail
            description={data.description || ""}
            onClick={() => this.toggleFullScreen(i)}
            imgURL={data.url}
            name={data.name}
            size={"small"}
          />
        </div>
      );
    }
    thumbnailsToShow.push(
      <div class={"col-md-3 col-sm-12 col-lg-3"}>
        <ThumbnailUpload
          index={thumbnails.length}
          recieveURL={this.recieveURL}
          addNewThumbnail={this.toggleFullScreen}
        />
      </div>
    );

    return thumbnailsToShow;
  }
}

export default AddThumbnails;
