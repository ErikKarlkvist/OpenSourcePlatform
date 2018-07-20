import React from "react";
import Button from "../common/Button";

const Container = props => {
  const style = {
    textAlign: "left",
    clear: "both",
    paddingTop: "20px",
    position: "relative",
    marginTop: "10px"
  };
  return <div style={style}>{props.children}</div>;
};
const Paragraph = () => {
  const style = {
    color: "white",
    marginTop: "3%"
  };
  return <p style={style}> Don’t hesitate to contact us and join the team.</p>;
};

const Contact = props => {
  const mailContact = () => {
    window.location = "mailto:xyz.dnb.no";
  };
  return (
    <Container>
      <Button style={{ width: "150px" }} onClick={mailContact}>
        Contact{" "}
      </Button>
      <Paragraph />
    </Container>
  );
};

export default Contact;
