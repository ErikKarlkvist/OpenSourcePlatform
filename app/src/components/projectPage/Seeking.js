import React from "react";
import Button from "../common/Button";

const Header = props => {
  const style = {
    width: "100%",
    paddingBottom: "20px"
  };
  return <div style={style}>{props.children}</div>;
};

const Title = () => {
  const style = {
    float: "left"
  };
  return <h3 style={style}>Looking for</h3>;
};

const SubContainer = props => {
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
  return (
    <p style={style}>
      {" "}
      Is this you? Don’t hesitate to contact us and join the team.
    </p>
  );
};

const LookingForList = props => {
  const styles = {
    list: {
      marginBottom: "20px"
    },
    removeText: {
      color: "white",
      cursor: "pointer"
    }
  };
  const listItems = [];
  for (let i = 0; i < props.lookingFor.length; i++) {
    const listElem = (
      <li key={i}>
        <h3>> {props.lookingFor[i]}</h3>
        {props.removeItem && (
          <a
            onClick={() => props.removeItem(props.lookingFor[i])}
            style={styles.removeText}
          >
            Remove
          </a>
        )}
      </li>
    );
    listItems.push(listElem);
  }

  return (
    <ul style={styles.list} className="list-unstyled">
      {listItems}
    </ul>
  );
};

const Seeking = props => {
  /*const lookinFor = [
    "Back-end Programmer",
    "UX designer",
    "Front-end developer"
  ];*/

  const mailContact = () => {
    window.location = "mailto:xyz.dnb.no";
  };

  return (
    <div className="ProjectTopInfo">
      <Header>
        <Title />
      </Header>
      <SubContainer>
        <LookingForList
          lookingFor={props.lookingFor}
          removeItem={props.removeItem}
        />
        <Button style={{ width: "150px" }} onClick={mailContact}>
          Contact{" "}
        </Button>
        <Paragraph />
      </SubContainer>
    </div>
  );
};
export default Seeking;
