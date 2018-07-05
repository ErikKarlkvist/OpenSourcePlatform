import React from 'react';
import PropTypes from 'prop-types'

class Spinner extends React.Component {

  static propTypes = {
    contributors: PropTypes.object.isRequired
  }

  render() {

    return (
      <div>
        <h3>Contributors</h3>
      </div>
    )

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
    display: "flex",
  },
  Contributors: {
    marginTop: "30px"
  }
}

export default Spinner;
