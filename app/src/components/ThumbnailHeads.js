import React from "react";
import PropTypes from "prop-types";

class ThumbnailHeads extends React.Component {
  static propTypes = {
    developers: PropTypes.object.isRequired
  };

  render() {
    const data = this.props.developers;

    let items = [];
    if (data) {
      items = data.slice(0, 3).map(d => (
        <div>
          <img style={styles.image} src={d.profileImageURL} />
        </div>
      ));
    }

    return (
      <div class="row align-bottom">
        {items}
        {data.length > 3 && (
          <span style={styles.ellipses} class="align-bottom">
            and {data.length - 3} more
          </span>
        )}
      </div>
    );
  }
}

const styles = {
  image: {
    backgroundColor: "white",
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    border: "1px white ",
    marginRight: "5px",
    objectFit: "cover"
  },
  ellipses: {
    fontSize: 12,
    marginTop: "20px"
  }
};

export default ThumbnailHeads;
