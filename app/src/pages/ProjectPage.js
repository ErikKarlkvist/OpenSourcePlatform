import React, { Component } from "react";
import logo from "../logo.svg";
import "./Main.css";
import { getProject } from "../backend/projects";
import LoginRegister from "../components/LoginRegister";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
<<<<<<< HEAD
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import Spinner from "../components/Spinner"
import ProjectHeader from "../components/ProjectHeader"
=======
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";
>>>>>>> f86f6be60a55683b75633146fac36fe1fc256499

class ProjectPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loading: true,
      project: {}
    };
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params.projectId) {
      getProject(this.props.match.params.projectId).then(project => {
        this.setState({
          loading: false,
          project
        });
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div class="PageContainer">
        <header className="App-header">
        
        </header>
        <div class="Content">
          <h1>{this.state.project.name}</h1>
<<<<<<< HEAD

=======
          {this.state.spinner && <Spinner />}
>>>>>>> f86f6be60a55683b75633146fac36fe1fc256499
        </div>
        <Spinner loading = {this.state.loading} fillPage={true}/>
      </div>
    );
  }
}

export default withRouter(ProjectPage);
