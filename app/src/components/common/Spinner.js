import React from "react";
import PropTypes from "prop-types";
import { PropagateLoader, CircleLoader } from "react-spinners";

const Spinner = props => {
  const style = props.fillPage ? styles.fillPage : {};

  if (props.loading) {
    if (props.type === "round") {
      return (
        <div style={style}>
          <CircleLoader color={props.color} size={40} />
        </div>
      );
    } else {
      return (
        <div style={style}>
          <PropagateLoader color={props.color} size={10} />
        </div>
      );
    }
  } else {
    return <div />;
  }
};

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  fillPage: PropTypes.bool,
  color: PropTypes.string,
  type: PropTypes.string
};

Spinner.defaultProps = {
  color: "white",
  fillPage: false,
  type: ""
};

const styles = {
  fillPage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  }
};

export default Spinner;
