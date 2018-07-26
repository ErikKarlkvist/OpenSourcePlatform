import React from "react";

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
        <h4>> {props.lookingFor[i]}</h4>
        {props.removeItem && (
          <a onClick={() => props.removeItem(i)} style={styles.removeText}>
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
