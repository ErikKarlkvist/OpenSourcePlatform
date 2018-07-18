import React from "react";
import PropTypes from "prop-types";
import "../../resources/Main.css";

const RemoveSubmittedUser = props => {
  return (
    <p
      style={{ color: "white", cursor: "pointer", textDecoration: "underline" }}
      onClick={() => props.removeUser(props.user)}
    >
      Remove owner
    </p>
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
    console.log(data);
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
          {/*Allows for removal of user in createProjectPage/UserSearch*/}
          {this.props.removeUser && (
            <RemoveSubmittedUser removeUser={this.props.removeUser} user={d} />
          )}
        </div>
      ));

      if (this.state.showAll) {
        this.setState({ owners: items, ownersToShow: items });
      } else {
        this.setState({ owners: items, ownersToShow: items.slice(0, 3) });
      }
    }
  };

  componentDidUpdate(nextProps) {
    if (nextProps.developers !== this.props.developers) {
      console.log(nextProps);
      this.getOwners();
    }
  }

  showAllOwners = () => {
    this.setState({ ownersToShow: this.state.owners, showAll: true });
  };

  collapseOwners = () => {
    this.setState({
      ownersToShow: this.state.owners.slice(0, 3),
      showAll: false
    });
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
            !this.state.showAll && (
              <div>
                <a style={styles.seeAllLink} onClick={this.showAllOwners}>
                  See {this.state.owners.length - 3} more
                </a>
              </div>
            )}
          {this.state.owners.length > 3 &&
            this.state.showAll && (
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
