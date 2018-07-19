import React, { Component } from "react";
import { getAllUsers } from "../../backend/users";
import "./UserSearch.css";
import Button from "./Button";
import Contributors from "../projectPage/Contributors";

const UserImage = props => {
  return <img className="userImage" src={props.url} />;
};

const SearchResult = props => {
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

const ShowSelectedUser = props => {
  return (
    <div>
      {props.user.image}
      {props.user.name}
      <div>
        <input
          onChange={e => props.onRoleChange(e)}
          value={props.role}
          placeholder={props.user.firstname + "'s role"}
          onKeyDown={e => props.submitOnEnter(e)}
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
    this.setState({
      submittedUsers: [...this.state.submittedUsers, subUser]
    });
    this.removeSelectedUser();
  };

  submitOnEnter = e => {
    console.log(e);
    if (e.key === "Enter") {
      this.submitUser(this.state.selected);
    }
  };

  removeSubmittedUser = user => {
    const newUsers = this.state.submittedUsers.filter(d => {
      return user.id !== d.id;
    });
    this.setState({ submittedUsers: newUsers });
  };

  render() {
    const { value, suggestions } = this.state;

    return (
      <div>
        <Contributors
          developers={this.state.submittedUsers}
          removeUser={this.removeSubmittedUser}
        />
        <div class="row">
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
              <ShowSelectedUser
                user={this.state.selected}
                role={this.state.role}
                onRoleChange={this.onRoleChange}
                submitUser={this.submitUser}
                submitOnEnter={this.submitOnEnter}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserSearchField;
