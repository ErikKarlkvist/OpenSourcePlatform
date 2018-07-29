import React from "react";
import PropTypes from "prop-types";
import "../../resources/Styles/AnimatedMenu.css";
import { Link } from "react-router-dom";

const RemoveSubmittedUser = props => {
  const styles = {
    container: {
      textAlign: "center"
    },
    text: {
      color: "white",
      cursor: "pointer",
      textDecoration: "underline"
    }
  };
  return (
    <div style={styles.container}>
      <p style={styles.text} onClick={() => props.removeUser(props.user)}>
        Remove owner
      </p>
    </div>
  );
};

class Contributors extends React.Component {
  static propTypes = {
    developers: PropTypes.array.isRequired
  };

  constructor() {
    super();
    this.state = { owners: [], ownersToShow: [], showAll: false };
  }

  componentDidMount() {
    this.getOwners();
  }

  getOwners = () => {
    const data = this.props.developers;
    let items = [];
    if (data) {
      items = data.map((d, i) => (
        <Link to={`/user/${d.id}`} key={i}>
          <div
            className="d-block d-sm-block d-md-block"
            style={styles.owner}
            key={i}
          >
            <img
              style={styles.image}
              src={d.profileImageURL || d.blankProfileUrl}
              alt={"profile"}
            />
            <p style={{ ...styles.name, ...{ marginBottom: "-10px" } }}>
              {d.firstname}
            </p>
            <p style={styles.name}>
              <i>{d.role}</i>
            </p>
            {/*Allows for removal of user in createProjectPage/UserSearch*/}
            {this.props.removeUser && (
              <RemoveSubmittedUser
                removeUser={this.props.removeUser}
                user={d}
              />
            )}
          </div>
        </Link>
      ));

      this.setState({ owners: items, ownersToShow: items.slice(0, 2) });
    }
  };

  componentDidUpdate(nextProps) {
    if (nextProps.developers !== this.props.developers) {
      this.getOwners();
    }
  }

  showAllOwners = () => {
    this.setState({ ownersToShow: this.state.owners, showAll: true });
  };

  collapseOwners = () => {
    this.setState({
      ownersToShow: this.state.owners.slice(0, 2),
      showAll: false
    });
  };

  render() {
    return (
      <div style={styles.container}>
        <div className="d-block d-sm-block d-md-block">
          <h3 style={{ textAlign: "left" }}>Owners</h3>
          <div style={styles.imageWrapper}>
            <div className="row">{this.state.ownersToShow}</div>
          </div>

          {this.state.owners.length > 2 &&
            this.state.ownersToShow.length < 3 && (
              <div>
                <a className="MenuItem" onClick={this.showAllOwners}>
                  See {this.state.owners.length - 2} more
                </a>
              </div>
            )}
          {this.state.owners.length > 2 &&
            this.state.ownersToShow.length >= 3 && (
              <div>
                <a className="MenuItem" onClick={this.collapseOwners}>
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
    textAlign: "left"
  },
  image: {
    backgroundColor: "white",
    height: "80px",
    width: "80px",
    marginLeft: "28px",
    marginRight: "28px",
    borderRadius: "50%",
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

    marginRight: "5px"
  },
  seeAllLink: {
    color: "white",
    cursor: "pointer",
    textAlign: "left"
  }
};

export default Contributors;
