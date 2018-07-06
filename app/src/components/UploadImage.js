import React, { Component } from "react";
import PropTypes from "prop-types";
import {uploadHeaderImage, uploadThumbnailImage, uploadProfileImage} from "../backend/storage";
import "./UploadImage.css";
import Spinner from "./Spinner"


/*
WARNING HOW TO USE:
<UploadImage type={"profileImage"} id={"czR8cVL2cieDEbcMnicvFwldM5s2"} recieveURL={this.recieveURL}/>
type is "profileImage", "headerImage" or "thumbnailImage"
id is user uid or project id
recieveURL is a callback function that recieves the url for the uploaded image (for rendering directly)
*/

class UploadImage extends Component {

  constructor(){
    super();
    this.state = {
      uploading: false,
      file: {}
    }
  }

  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };


  render() {
    //hooka med login
    if(this.state.uploading){
      return <div style={styles.container}><Spinner loading={true}/></div>
    } else {
      return (
        <div style={styles.container}>
          <label class="UploadLabel">
            <input type="file" onChange = {(e) => {this.handleEvent(e)}} accept="image/*"></input>
            +Add image
          </label>
        </div>
      );
    }

  }

  handleEvent = (e) => {
    let newUrl = ""
    this.setState({uploading:true})
    if(this.props.type === "headerImage"){
      uploadHeaderImage(e.target.files[0], this.props.id).then((output) => {
        newUrl = output.url;
        this.setState({uploading:false})
      }).catch((error) => {
        console.log(error);
      })
    } else if(this.props.type === "thumbnailImage"){
      uploadThumbnailImage(e.target.files[0], this.props.id).then((output) => {
        newUrl = output.url;
        this.setState({uploading:false})
      }).catch((error) => {
        console.log(error);
      })
    } else if(this.props.type === "profileImage"){
      uploadProfileImage(e.target.files[0], this.props.id).then((output) => {
        newUrl = output.url;
        this.setState({uploading:false})
      }).catch((error) => {
        console.log(error);
      })
    } else {
      console.log("upload type not supported")
      this.setState({uploading: false})
    }

    if(this.props.recieveURL){
      this.props.recieveURL(newUrl);
    }
    //

  }


}

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent:"center"
  }
}

export default UploadImage;
