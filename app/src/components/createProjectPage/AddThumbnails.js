import React, { Component } from "react";
import Line from "../common/Line.js";
import CreateUpdatePost from "./CreateUpdatePost";

const Container = props => {
  const style = {
    textAlign: "left",
    marginBottom: "50vh"
  };
  return <div style={style}>{props.children}</div>;
};

const Title = props => {
  const style = { paddingTop: "50px" };
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

  if (props.imageURL) {
    return (
      <div style={styles.container}>
        {props.imageURL && <img style={styles.img} src={props.imageURL} />}
      </div>
    );
  } else {
    return (
      <div style={styles.circle} onClick={() => props.addNewThumbnail()}>
        <p style={styles.plus}>+</p>
      </div>
    );
  }
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
      <Container>
        <Line full={true} />
        <Title />
        <div className="row">
          {thumbnailsToShow}
          {this.state.showFullScreen && (
            <CreateUpdatePost
              toggleFullScreen={this.toggleFullScreen}
              projectID={this.props.projectID}
            />
          )}
        </div>
      </Container>
    );
  }
}

export default AddThumbnails;
