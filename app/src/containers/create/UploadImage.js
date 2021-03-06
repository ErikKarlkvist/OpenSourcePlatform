import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  uploadHeaderImage,
  uploadThumbnailImage,
  uploadProfileImage
} from "../../backend/storage";
import Spinner from "../../components/common/Spinner";
import { hasVerifiedEmail } from "../../backend/validation";

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
        <div style={this.styles.spinnerContainer}>
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
    //event somehow loses it's reference sometime, make a copy of it
    var event = Object.assign({}, e);
    hasVerifiedEmail().then(verified => {
      if (!verified) {
        alert(
          "Permission Denied. Your email is not verfied, verify it by clicking on the link you recevied when creating your account. You can generate a new email from your profile."
        );
        return;
      }

      this.setState({ uploading: true });
      if (this.props.type === "headerImage") {
        uploadHeaderImage(event.target.files[0], this.props.id)
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
        uploadThumbnailImage(event.target.files[0], this.props.id)
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
        uploadProfileImage(event.target.files[0], this.props.id)
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
    });
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
    spinnerContainer: {
      display: "flex",
      justifyContent: "center",
      width: "200px",
      marginTop: "20px"
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
