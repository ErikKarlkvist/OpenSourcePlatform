import React from "react";
import PropTypes from "prop-types";
import { PropagateLoader } from "react-spinners";

class Spinner extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  };

  render() {
    const style = this.props.fillPage ? styles.fillPage : {};

    if (this.props.loading) {
      return (
        <div style={style}>
          <PropagateLoader color={this.props.color || "white"} size={10} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

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