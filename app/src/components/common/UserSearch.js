import React, { Component } from "react";
import { getAllUsers } from "../../backend/users";
import "./UserSearch.css";
import Button from "./Button";
import Contributors from "../projectPage/Contributors";

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

const ShowUser = props => {
  return (
    <div>
      {props.user.image}
      {props.user.name}
      <div>
        <input
          onChange={e => props.onRoleChange(e)}
          value={props.role}
          placeholder={props.user.name.split()[0] + "'s role"}
        />
      </div>
      <Button onClick={() => props.submitUser(props.user)}>Submit user</Button>
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
      selected: {},
      submittedUsers: [],
      role: ""
    };
  }

  componentDidMount() {
    getAllUsers().then(usersAllInfo => {
      const users = usersAllInfo.map(d => {
        return {
          ...d,
          name: d.firstname + " " + d.lastname,

          image: <UserImage url={d.profileImageURL} />
        };
      });
      this.setState({ users });
    });
  }

  onChange = e => {
    const value = e.target.value;
    this.showSuggestions(value);
    this.setState({ value });
  };

  showSuggestions = value => {
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

    this.setState({ suggestions });
  };

  onRoleChange = e => {
    this.setState({ role: e.target.value });
  };

  handleClick = user => {
    this.props.addOwner(user.id);
    this.setState({ value: "", suggestions: [], selected: user });
  };

  selectUser = user => {
    this.setState({ selected: user });
  };

  removeSelectedUser = () => {
    this.setState({ selected: {}, role: "" });
  };

  submitUser = user => {
    const subUser = { userID: user.id, role: this.state.role, ...user };
    console.log("!", subUser);
    this.setState({
      submittedUsers: [...this.state.submittedUsers, subUser]
    });
    this.removeSelectedUser();
  };

  render() {
    const { value, suggestions } = this.state;

    return (
      <div class="container">
        USER SEARCH
        <div class="row" style={{ height: "500px" }}>
          <div class="col-md-6 col-sm-6 col-lg-6">
            <input
              className="search-input"
              onChange={e => this.onChange(e)}
              value={this.state.value}
              placeholder="Search users"
            />
            {suggestions.length < this.state.users.length && (
              <div className="suggestions-container">{suggestions}</div>
            )}
          </div>
          {this.state.selected.name !== undefined && (
            <div class="col-md-6 col-sm-6 col-lg-6">
              <ShowUser
                user={this.state.selected}
                role={this.state.role}
                onRoleChange={this.onRoleChange}
                submitUser={this.submitUser}
              />
            </div>
          )}
        </div>
        <Contributors developers={this.state.submittedUsers} />
      </div>
    );
  }
}

export default UserSearchField;
