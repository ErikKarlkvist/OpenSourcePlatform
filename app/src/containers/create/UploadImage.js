import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  uploadHeaderImage,
  uploadThumbnailImage,
  uploadProfileImage
} from "../../backend/storage";
import Spinner from "../../components/common/Spinner";

/*
WARNING HOW TO USE:
<UploadImage type={} id={} recieveURL={this.recieveURL}/>
type is "profileImage", "headerImage" or "thumbnailImage"
id is user uid or project id
recieveURL is a callback function that recieves the url for the uploaded image (for rendering directly)
*/

class UploadImage extends Component {
  constructor() {
    super();
    this.state = {
      uploading: false,
      file: {}
    };
  }

  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

  render() {
    if (this.state.uploading) {
      return (
        <div style={this.styles.container}>
          <Spinner
            loading={true}
            color={this.props.loadingColor || "white"}
            type={this.props.loadingType}
          />
        </div>
      );
    } else {
      const textColor = this.props.color
        ? { color: this.props.color }
        : { color: "white" };

      return (
        <div style={this.styles.container}>
          <label style={{ ...this.styles.uploadLabel, ...textColor }}>
            <input
              type="file"
              onChange={e => {
                this.handleEvent(e);
              }}
              accept="image/*"
            />
            {this.props.label || "+Add image"}
          </label>
        </div>
      );
    }
  }

  handleEvent = e => {
    let newUrl = "";
    this.setState({ uploading: true });
    if (this.props.type === "headerImage") {
      uploadHeaderImage(e.target.files[0], this.props.id)
        .then(output => {
          this.setState({ uploading: false });
          if (this.props.recieveURL) {
            this.props.recieveURL(output.downloadURL);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.props.type === "thumbnailImage") {
      uploadThumbnailImage(e.target.files[0], this.props.id)
        .then(output => {
          this.setState({ uploading: false });
          if (this.props.recieveURL) {
            this.props.recieveURL(output.downloadURL);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.props.type === "profileImage") {
      uploadProfileImage(e.target.files[0], this.props.id)
        .then(output => {
          this.setState({ uploading: false });
          if (this.props.recieveURL) {
            this.props.recieveURL(output.downloadURL);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ uploading: false });
    }

    //
  };

  styles = {
    container: {
      display: "flex",
      justifyContent: "flex-start",
      marginTop: "20px",
      marginLeft: "20px",
      width: "200px"
    },
    uploadLabel: {
      cursor: "pointer",
      textDecoration: "underline",
      fontStyle: "italic",
      width: "200px",
      textAlign: "center"
    }
  };
}

export default UploadImage;
