import React from "react";
import PropTypes from "prop-types";

class Spinner extends React.Component {
  static propTypes = {
    developers: PropTypes.object.isRequired
  };

  render() {
    const data = this.props.developers;

    let items = [];
    if (data) {
      items = data.map(d => (
        <div class="d-none d-sm-none d-md-block">
          <img style={styles.image} src={d.profileImageURL} />
          <p style={styles.name}>{d.firstname}</p>
        </div>
      ));
    }

    return (
      <div style={styles.container}>
        <div class="d-none d-sm-none d-md-block">
          <h3>Contributors</h3>
          <div style={styles.imageWrapper}>
            <div class="row">{items}</div>

            {items.length > 5 && (
              <a
                style={{
                  textDecoration: "underline",
                  marginBottom: 20,
                  marginLeft: 20,
                  fontSize: 14
                }}
                href="#"
              >
                See all
              </a>
            )}
          </div>
        </div>
        <div class="d-block d-sm-none d-md-none">
          <a href="#">View contributors</a>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    alignText: "left",
    marginTop: "10%"
  },
  image: {
    backgroundColor: "white",
    height: "100px",
    width: "100px",
    marginLeft: "15px",
    marginRight: "15px",
    borderRadius: "50%",
    border: "1px white ",
    objectFit: "cover"
  },
  imageWrapper: {
    width: "100%",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: "30px"
  },
  name: {
    color: "white",
    alignText: "center",
    marginTop: "10px"
  }
};

export default Spinner;
