import React from "react";
import PropTypes from "prop-types";
import "../resources/Main.css";

class Contributors extends React.Component {
  static propTypes = {
    developers: PropTypes.object.isRequired
  };

  render() {
    const data = this.props.developers;

    let items = [];
    if (data) {
      items = data.map(d => (
        <div class="d-none d-sm-none d-md-block" style={styles.owner}>
          <img style={styles.image} src={d.profileImageURL} />
          <p style={styles.name}>{d.firstname}</p>
          <p style={styles.name}>
            <i>{d.role}</i>
          </p>
        </div>
      ));
    }

    return (
      <div style={styles.container}>
        <div class="d-none d-sm-none d-md-block">
          <h3 style={{ textAlign: "left" }}>Owners</h3>
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
          <button className="SeeThroughBtn" onClick={() => {}}>
            <h6>View owners</h6>
          </button>
          {/*TODO: Open contributor modal on click*/}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    alignText: "left",
    marginTop: "30px"
  },
  image: {
    backgroundColor: "white",
    height: "100px",
    width: "100px",
    marginLeft: "21px",
    marginRight: "21px",
    borderRadius: "50%",
    border: "1px white ",
    objectFit: "cover"
  },
  imageWrapper: {
    width: "100%",
    margin: "auto",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  owner: {
    width: "142px"
  },
  name: {
    color: "white",
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "-10px",
    marginLeft: "5px",
    marginRight: "5px"
  }
};

export default Contributors;
