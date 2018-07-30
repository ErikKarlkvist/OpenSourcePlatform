import ReactTooltip from "react-tooltip";
import React from "react";

const HeaderWithTooltip = props => {
  const styles = {
    HelperText: {
      fontSize: "25px",
      position: "absolute",
      top: -3,
      left: 10
    },
    Container: {
      display: "flex",
      justifyContent: "space-between"
    },
    Header: {
      textAlign: "left"
    },
    circle: {
      border: "1px solid white",
      borderRadius: "50%",
      height: 30,
      width: 30,
      position: "relative",
      cursor: "zoom-in"
    }
  };
  return (
    <div style={styles.Container}>
      <h3>{props.children}</h3>
      <div style={styles.circle} data-tip={props.tooltip}>
        <a style={styles.HelperText}>?</a>
      </div>
      <ReactTooltip
        place="right"
        multiline={true}
        type="light"
        effect="float"
        delayShow={200}
      />
    </div>
  );
};

export default HeaderWithTooltip;
