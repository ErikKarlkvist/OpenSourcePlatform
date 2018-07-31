import React, { Component } from "react";
import Line from "../../components/common/Line.js";
import CreateAttachmentPost from "./CreateAttachmentPost";
import Thumbnail from "../../components/common/Thumbnail";

const Container = props => {
  const style = {
    textAlign: "left",
    marginTop: "80px",
    backgroundColor: "var(--light-teal-80)"
  };
  return <div style={style}>{props.children}</div>;
};

const Title = props => {
  const style = { paddingTop: "50px", color: "var(--dark-teal)" };
  return <h3 style={style}>Attachments (optional)</h3>;
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
      thumbnails: [],
      currentItem: undefined
    };
  }

  recieveURL = (url, i) => {
    const { thumbnails } = this.state;

    if (thumbnails[i]) {
      thumbnails[i].url = url;
    } else {
      thumbnails[i] = { url };
    }

    this.props.setThumbnails(thumbnails);
  };

  toggleFullScreen = index => {
    this.setState((prevState, props) => {
      return {
        showFullScreen: !prevState.showFullScreen,
        currentItem: index
      };
    });
  };

  addThumbnail = thumbnail => {
    const { thumbnails } = this.props;
    const index = this.state.currentItem;
    if (index < thumbnails.length) {
      thumbnails[index] = thumbnail;
    } else {
      thumbnails.unshift(thumbnail);
    }
    this.props.setThumbnails(thumbnails);
    this.toggleFullScreen(null);
  };

  removeThumbnail = () => {
    if (this.state.currentItem !== null) {
      let { thumbnails } = this.props;
      thumbnails.splice(this.state.currentItem, 1);
      this.props.setThumbnails(thumbnails);
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
              <CreateAttachmentPost
                toggleFullScreen={this.toggleFullScreen}
                projectID={this.props.projectID}
                data={this.props.thumbnails[this.state.currentItem]}
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
    const { thumbnails } = this.props;
    const thumbnailsToShow = [];
    for (let i = 0; i < thumbnails.length; i++) {
      const data = thumbnails[i];
      thumbnailsToShow.push(
        <div
          className={"col-md-3 col-sm-12 col-lg-3"}
          style={styles.thumbnailStyle}
          key={i}
        >
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
    thumbnailsToShow.unshift(
      <div
        className={"col-md-3 col-sm-12 col-lg-3"}
        style={styles.thumbnailStyle}
        key={thumbnails.length}
      >
        <ThumbnailUpload
          index={thumbnails.length}
          recieveURL={this.recieveURL}
          addNewThumbnail={() => this.toggleFullScreen(thumbnailsToShow.length)}
        />
      </div>
    );

    return thumbnailsToShow;
  }
}

const styles = {
  thumbnailStyle: {
    marginBottom: 30,
    display: "flex",
    justifyContent: "center"
  }
};

export default AddThumbnails;
