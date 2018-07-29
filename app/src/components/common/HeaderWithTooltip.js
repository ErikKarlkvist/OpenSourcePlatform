import ReactTooltip from "react-tooltip";
import React from "react";

const HeaderWithTooltip = props => {
  const styles = {
    HelperText: {
      textDecoration: "underline",
      textDecorationStyle: "dashed",
      marginRight: "20px"
    },
    Container: {
      display: "flex",
      justifyContent: "space-between"
    },
    Header: {
      textAlign: "left"
    }
  };
  return (
    <div style={styles.Container}>
      <h3>{props.children}</h3>
      <a data-tip={props.tooltip} style={styles.HelperText}>
        Tips
      </a>
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
