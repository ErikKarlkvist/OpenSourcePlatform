import React from "react";
import PropTypes from "prop-types";
import "../../resources/Main.css";

class Contributors extends React.Component {
  static propTypes = {
    developers: PropTypes.array.isRequired
  };

  constructor() {
    super();
    this.state = { owners: [], ownersToShow: [] };
  }

  componentDidMount() {
    this.getOwners();
  }

  getOwners = () => {
    const data = this.props.developers;

    let items = [];
    if (data) {
      items = data.map(d => (
        <div class="d-block d-sm-block d-md-block" style={styles.owner}>
          <img style={styles.image} src={d.profileImageURL} />
          <p style={{ ...styles.name, ...{ marginBottom: "-10px" } }}>
            {d.firstname}
          </p>
          <p style={styles.name}>
            <i>{d.role}</i>
          </p>
        </div>
      ));
      const ownersLength = items.length;

      this.setState({ owners: items, ownersToShow: items.slice(0, 3) });
    }
  };

  componentDidUpdate(nextProps) {
    console.log(nextProps);
    if (!nextProps === this.props) {
      this.getOwners();
    }
  }

  showAllOwners = () => {
    this.setState({ ownersToShow: this.state.owners });
  };

  collapseOwners = () => {
    this.setState({ ownersToShow: this.state.owners.slice(0, 3) });
  };

  render() {
    return (
      <div style={styles.container}>
        <div class="d-block d-sm-block d-md-block">
          <h3 style={{ textAlign: "left" }}>Owners</h3>
          <div style={styles.imageWrapper}>
            <div class="row">{this.state.ownersToShow}</div>
          </div>

          {this.state.owners.length > 3 &&
            this.state.ownersToShow.length < 4 && (
              <div>
                <a style={styles.seeAllLink} onClick={this.showAllOwners}>
                  See {this.state.owners.length - 3} more
                </a>
              </div>
            )}
          {this.state.owners.length > 3 &&
            this.state.ownersToShow.length >= 4 && (
              <div>
                <a style={styles.seeAllLink} onClick={this.collapseOwners}>
                  See fewer
                </a>
              </div>
            )}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    alignText: "left"
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
    marginLeft: "5px",
    marginRight: "5px"
  },
  seeAllLink: {
    color: "white",
    float: "right",
    textDecoration: "underline",
    width: "100%",
    cursor: "pointer"
  }
};

export default Contributors;
