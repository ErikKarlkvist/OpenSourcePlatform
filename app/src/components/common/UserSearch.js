import React, { Component } from "react";
import { getAllUsers } from "../../backend/users";

const UserImage = props => {
  const style = {
    height: "30px",
    width: "30px",
    objectFit: "cover",
    float: "right",
    paddingRight: "10px"
  };
  return <img style={style} src={props.url} />;
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
  console.log(props);
  return (
    <div style={style} onClick={e => props.addOwner(props.user.id)}>
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
      console.log(usersAllInfo);
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
    console.log(this.state.users);
    const value = e.target.value;
    const suggestions = this.state.users
      .filter(d => d.name.toLowerCase().includes(value.toLowerCase()))
      .map(d => <SearchResult user={d} addOwner={this.props.addOwner} />);

    console.log(suggestions);
    this.setState({ value, suggestions });
  };

  render() {
    const { value, suggestions } = this.state;

    return (
      <div>
        USER SEARCH
        <input onChange={e => this.onChange(e)} />
        {suggestions.length < this.state.users.length && suggestions}
      </div>
    );
  }
}

export default UserSearchField;
