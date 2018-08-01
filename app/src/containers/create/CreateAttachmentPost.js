import React, { Component } from "react";
import UploadImage from "./UploadImage";
import InputTextBox from "../../components/common/InputTextBox";
import Button from "../../components/common/Button";

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
    height: "100%",
    margin: "20%",
    marginBottom: "200px",
    textAlign: "left",
    backgroundColor: "white",
    zIndex: 10,
    minWidth: "60%"
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
      backgroundColor: "var(--white-three)",
      marginTop: "-10px"
    },
    cancel: {
      color: "var(--dark-teal)",
      marginRight: 20,
      marginTop: 7
    },
    leftButton: {}
  };

  return (
    <div style={styles.container}>
      <Button style={styles.leftButton} warning={true} onClick={props.remove}>
        Delete update
      </Button>
      <div style={{ display: "flex" }}>
        <p style={styles.cancel}>Cancel</p>
        <Button
          solidBtn={true}
          style={styles.rightButton}
          onClick={props.addThumbnail}
        >
          Save update
        </Button>
      </div>
    </div>
  );
};

class CreateUpdatePost extends Component {
  constructor(props) {
    super(props);
    if (props.data) {
      this.state = {
        url: props.data.url || "",
        name: props.data.name || "",
        description: props.data.description || ""
      };
    } else {
      this.state = {
        url: "",
        name: "",
        description: ""
      };
    }
  }

  recieveURL = url => {
    this.setState({ url });
  };

  addThumbnail = () => {
    if (!this.state.url) {
      alert("Please upload an image");
    } else if (!this.state.name.trim()) {
      alert("Please provide a title");
    } else if (!this.state.description.trim()) {
      alert("Please provide description");
    } else {
      this.props.addThumbnail({
        url: this.state.url,
        name: this.state.name,
        description: this.state.description
      });
    }
  };

  render() {
    return (
      <Container>
        <Closer toggleFullScreen={this.props.toggleFullScreen} />
        <Content>
          <div style={styles.wrapper}>
            {this.state.url && (
              <img
                alt="Update header"
                src={this.state.url}
                style={styles.image}
              />
            )}
            {!this.state.url && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "140px",
                  marginBottom: "120px"
                }}
              >
                <UploadImage
                  type={"thumbnailImage"}
                  id={this.props.projectID}
                  recieveURL={this.recieveURL}
                  color="grey"
                  loadingColor="grey"
                />
              </div>
            )}
            <div style={{ backgroundColor: "var(--white-three)" }}>
              <InputTextBox
                title="Title"
                placeholder="Title"
                name="name"
                maxChars={50}
                showCounter={false}
                textColor={"var(--dark-teal)"}
                value={this.state.name}
                handleInputChange={this.handleInputChange}
                className={"UpdateTitle"}
              />
              <InputTextBox
                title="Description"
                placeholder="Give a descriptive text to the image. Max 1000 characters."
                name="description"
                maxChars={1000}
                showCounter={false}
                textColor={"var(--dark-teal)"}
                value={this.state.description}
                handleInputChange={this.handleInputChange}
                className={"UpdateDescription"}
                multiline={true}
              />
              <Buttons
                remove={this.props.removeThumbnail}
                addThumbnail={this.addThumbnail}
              />
            </div>
          </div>
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
  wrapper: {
    backgroundColor: "white"
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
