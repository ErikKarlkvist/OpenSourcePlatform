import React, { Component } from "react";
import { getAllUsers } from "../../backend/users";
import "./UserSearch.css";

const UserImage = props => {
  return <img className="userImage" src={props.url} />;
};

const SearchResult = props => {
  const style = {
    backgroundColor: "white",
    height: "40px",
    textAlign: "left",
    color: "black",
    paddingLeft: "20px",
    justifyContent: "center",
    borderBottom: "1px solid grey"
  };

  return (
    <div
      //style={style}
      className="suggestion"
      onClick={e => props.handleClick(props.user)}
    >
      {props.user.name}
      {props.user.profileImageURL && props.user.image}
    </div>
  );
};

class UserSearchField extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
      users: [],
      selected: []
    };
  }

  componentDidMount() {
    getAllUsers().then(usersAllInfo => {
      const users = usersAllInfo.map(d => {
        return {
          id: d.id,
          name: d.firstname + " " + d.lastname,
          profileImageURL: d.profileImageURL,
          image: <UserImage url={d.profileImageURL} />
        };
      });
      this.setState({ users });
    });
  }

  onChange = e => {
    const value = e.target.value;
    const suggestions = this.state.users
      .filter(d => d.name.toLowerCase().includes(value.toLowerCase()))
      .map(d => {
        return (
          <SearchResult
            user={d}
            addOwner={this.props.addOwner}
            handleClick={this.handleClick}
          />
        );
      });

    this.setState({ value, suggestions });
  };

  handleClick = user => {
    this.props.addOwner(user.id);
    this.setState({ value: "" });
  };

  render() {
    const { value, suggestions } = this.state;

    return (
      <div>
        USER SEARCH
        <input className="search-input" onChange={e => this.onChange(e)} />
        {suggestions.length < this.state.users.length && (
          <div className="suggestions-container">{suggestions}</div>
        )}
      </div>
    );
  }
}

export default UserSearchField;
