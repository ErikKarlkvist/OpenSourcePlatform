import React, { Component } from "react";
import UploadImage from "./UploadImage";
import InputTextBox from "./InputTextBox";
import Button from "../common/Button";

const Container = props => {
  const style = {
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
  };
  return <div style={style}>{props.children}</div>;
};

const Content = props => {
  const style = {
    height: "80vh",
    margin: "20%",
    minWidth: "80vh",
    textAlign: "left",
    backgroundColor: "white",
    zIndex: 4
  };
  return <div style={style}>{props.children}</div>;
};

const Closer = props => {
  const style = {
    height: "100%",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 3
  };

  return <div style={style} onClick={props.toggleFullScreen} />;
};

const Buttons = props => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: "20px",
      paddingRight: "15px",
      paddingLeft: "15px",
      paddingBottom: "15px",
      backgroundColor: "white",
      marginTop: "-10px"
    },
    rightButton: {},
    leftButton: {}
  };

  return (
    <div style={styles.container}>
      <Button
        style={styles.leftButton}
        warning={true}
        onClick={() => props.remove(props.index)}
      >
        Remove update
      </Button>
      <Button
        solidBtn={true}
        style={styles.rightButton}
        onClick={props.addThumbnail}
      >
        Submit update
      </Button>
    </div>
  );
};
class CreateUpdatePost extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      title: "",
      description: ""
    };
  }

  recieveURL = url => {
    console.log(url);
    this.setState({ url });
  };

  addThumbnail = () => {
    if (!this.state.url) {
      alert("Please upload an image");
    } else if (!this.state.name) {
      alert("Please provide a title");
    } else if (!this.state.description) {
      alert("Please provide description");
    } else {
      this.props.addThumbnail({
        url: this.state.url,
        name: this.state.name,
        description: this.state.description
      });
    }
  };

  remove = () => {};

  render() {
    return (
      <Container>
        <Closer toggleFullScreen={this.props.toggleFullScreen} />
        <Content>
          {this.state.url && <img src={this.state.url} style={styles.image} />}
          {!this.state.url && (
            <div style={{ marginTop: "100px" }}>
              <UploadImage
                type={"thumbnailImage"}
                id={this.props.projectID}
                recieveURL={this.recieveURL}
                color="grey"
              />
            </div>
          )}
          <InputTextBox
            title="Title"
            placeholder="Title"
            name="name"
            maxChars={20}
            textColor={"var(--dark-teal)"}
            value={this.state.name}
            handleInputChange={this.handleInputChange}
            className={"UpdateTitle"}
          />
          <InputTextBox
            title="Description"
            placeholder="Description"
            name="description"
            maxChars={1000}
            textColor={"var(--dark-teal)"}
            value={this.state.description}
            handleInputChange={this.handleInputChange}
            className={"UpdateDescription"}
            multiline={true}
          />
          <Buttons remove={this.remove} addThumbnail={this.addThumbnail} />
        </Content>
      </Container>
    );
  }

  handleInputChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };
}

export default CreateUpdatePost;

const styles = {
  content: {
    // height: "80vh",
  },
  image: {
    width: "100%",
    objectFit: "scale-down"
  },
  desc: {
    marginTop: -10,
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: 10,
    paddingBottom: 10,
    border: "solid 1px blue",
    color: "var(--dark-teal)",
    backgroundColor: "white"
  }
};
