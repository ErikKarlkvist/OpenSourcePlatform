import React, { Component } from "react";
import { getAllUsers } from "../../backend/users";
import "../../resources/Styles/UserSearch.css";
import Button from "../../components/common/Button";
import Contributors from "../project/Contributors";

const UserImageBig = props => {
  return <img className="userImageBig" src={props.url} alt="Profile" />;
};

const SearchResult = props => {
  return (
    <div className="suggestion" onClick={e => props.handleClick(props.user)}>
      {props.user.name}
      {props.user.profileImageURL && props.user.image}
    </div>
  );
};

const ShowSelectedUser = props => {
  return (
    <div style={{ margin: "5px" }}>
      {props.user.name}
      {props.user.image}
      <div>
        <input
          className="inputTextBox"
          onChange={e => props.onRoleChange(e)}
          value={props.role}
          placeholder={props.user.firstname + "'s role"}
          onKeyDown={e => props.submitOnEnter(e)}
        />{" "}
        <Button
          style={{ margin: "5px" }}
          onClick={() => props.submitUser(props.user)}
        >
          Add owner
        </Button>
      </div>
    </div>
  );
};

class UserSearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: [],
      users: [],
      selected: {},
      submittedUsers: props.currentOwners,
      role: ""
    };
  }

  componentDidMount() {
    getAllUsers().then(usersAllInfo => {
      const users = usersAllInfo.map(d => {
        return {
          ...d,
          name: d.firstname + " " + d.lastname,

          image: <UserImageBig url={d.profileImageURL} />
        };
      });
      this.setState({ users });
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      submittedUsers: props.currentOwners
    });
  }

  removeSuggestions = () => {
    this.setState({ suggestions: [] });
  };

  onChange = e => {
    const value = e.target.value;
    this.showSuggestions(value);
    this.setState({ value });
  };

  showSuggestions = value => {
    if (!value) {
      this.setState({ suggestions: [] });
      return;
    }
    const suggestions = this.state.users
      .filter(
        d =>
          d.name.toLowerCase().includes(value.toLowerCase()) &&
          !this.props.currentOwners.some(owner => owner.id === d.id)
      )
      .map(d => {
        return <SearchResult user={d} handleClick={this.handleClick} />;
      });
    this.setState({ suggestions });
  };

  onRoleChange = e => {
    this.setState({ role: e.target.value });
  };

  handleClick = user => {
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
    const users = [...this.props.currentOwners, subUser];
    this.props.setOwners(users);
    this.removeSelectedUser();
  };

  submitOnEnter = e => {
    if (e.key === "Enter") {
      this.submitUser(this.state.selected);
    }
  };

  removeSubmittedUser = user => {
    const newUsers = this.props.currentOwners.filter(d => {
      return user.id !== d.id;
    });
    this.props.setOwners(newUsers);
  };

  render() {
    const { value, suggestions } = this.state;

    return (
      <div>
        <div style={{ marginBottom: "20px" }} class="row">
          {this.state.selected.name == undefined && (
            <div class="col-md-12 col-sm-12 col-lg-12">
              <input
                className="search-input"
                onChange={e => this.onChange(e)}
                value={value}
                placeholder="Search users"
                onFocus={() => this.showSuggestions(value)}
              />
              {suggestions.length < this.state.users.length && (
                <div
                  className={
                    "suggestions-container " +
                    (suggestions.length > 0 && "suggestions-border")
                  }
                >
                  {suggestions}
                </div>
              )}
            </div>
          )}
          {this.state.selected.name !== undefined && (
            <div className="col-md-12 col-sm-12 col-lg-12">
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
        <Contributors
          developers={this.props.currentOwners}
          removeUser={this.removeSubmittedUser}
        />
      </div>
    );
  }
}

export default UserSearchField;
