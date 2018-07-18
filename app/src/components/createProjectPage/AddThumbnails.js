import React, { Component } from "react";
import UploadImage from "./UploadImage";

const ThumbnailUpload = props => {
  const styles = {
    container: {
      width: "200px",
      minHeight: "350px",
      border: "solid 1px gray",
      backgroundColor: "white"
    },
    uploadImage: {
      paddingTop: "80px",
      backgroundColor: "#d8d8d8",
      width: "198px",
      height: "200px"
    },
    img: {
      objectFit: "cover",
      width: "200px",
      height: "200px"
    },
    circle: {
      width: "200px",
      height: "200px",
      borderRadius: "100px",
      border: "solid 1px white"
    }
  };

  if (props.imageURL) {
    return (
      <div style={styles.container}>
        {props.imageURL && <img style={styles.img} src={props.imageURL} />}
        <div style={styles.circle} onClick={() => props.addNewThumbnail()} />
      </div>
    );
  } else {
    return (
      <div style={styles.circle} onClick={() => props.addNewThumbnail()} />
    );
  }
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
        <img src={"no image"} style={styles.image} />
        <h2 style={styles.title}>{"byt till input field"}</h2>
        <p style={styles.desc}>{"byt till input field"}</p>
      </div>
    </div>
  );
};

/*
{!props.imageURL && (
        <div style={styles.uploadImage}>
          <UploadImage
            type={"thumbnailImage"}
            id={props.projectID}
            recieveURL={url => props.recieveURL(url, props.index)}
            color={"var(--dark-teal)"}
          />
        </div>
      )}*/

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

  render() {
    const { thumbnails } = this.state;
    const thumbnailsToShow = [];
    for (let i = 0; i <= thumbnails.length; i++) {
      thumbnailsToShow.push(
        <div class={"col-md-3 col-sm-12 col-lg-3"}>
          <ThumbnailUpload
            projectID={this.props.projectID}
            index={i}
            recieveURL={this.recieveURL}
            imageURL={thumbnails[i] ? thumbnails[i].url : undefined}
            addNewThumbnail={this.toggleFullScreen}
          />
        </div>
      );
    }
    return (
      <div className="row">
        {thumbnailsToShow}
        {this.state.showFullScreen && (
          <FullScreenImage
            toggleFullScreen={this.toggleFullScreen}
            projectID={this.props.projectID}
          />
        )}
      </div>
    );
  }
}

export default AddThumbnails;
