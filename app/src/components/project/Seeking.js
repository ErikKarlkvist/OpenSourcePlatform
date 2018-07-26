import React from "react";

const SubContainer = props => {
  const style = {
    textAlign: "left",
    clear: "both",
    position: "relative",
    marginTop: "10px"
  };
  return <div style={style}>{props.children}</div>;
};

const LookingForList = props => {
  const styles = {
    list: {
      marginBottom: "20px"
    },
    removeText: {
      color: "white",
      cursor: "pointer",
      marginLeft: "20px",
      textShadow: "1px 1px black"
    },
    container: {
      display: "flex",
      justifyContent: "flex-start"
    }
  };
  const listItems = [];
  for (let i = 0; i < props.lookingFor.length; i++) {
    const listElem = (
      <li key={i} style={styles.container}>
        <h4>> {props.lookingFor[i]}</h4>
        {props.removeItem && (
          <h4 onClick={() => props.removeItem(i)} style={styles.removeText}>
            ⮾
          </h4>
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
  return (
    <div className="ProjectTopInfo">
      <SubContainer>
        <LookingForList
          lookingFor={props.lookingFor}
          removeItem={props.removeItem}
        />
      </SubContainer>
    </div>
  );
};
export default Seeking;
