import React, { Component } from "react";
import logo from "../logo.svg";
import { getAllProjects } from "../backend/projects";
import { getUser } from "../backend/users.js";
import ProjectsDisplay from "../components/homePage/ProjectsDisplay";
import LoginRegister from "../components/common/LoginRegister";
import FilterProjects from "../components/homePage/FilterProjects";
import Line from "../components/common/Line";
import Spinner from "../components/common/Spinner";
import { BrowserRouter as Link } from "react-router-dom";
import firebase from "../backend/firebase";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      currentlyViewing: [],
      loading: true,
      isLoggedIn: false,
      hasFetchedUser: false
    };
  }

  componentDidMount() {
    getAllProjects().then(projects => {
      this.setState({
        currentlyViewing: projects,
        allProjects: projects,
        liveProjects: [projects[0]],
        graduateProjects: [projects[projects.length - 1]],
        loading: false
      });
    });

    this.issueTest();

    this.setupAuthStateChange();
  }

  issueTest() {}

  setupAuthStateChange() {
    const page = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        getUser(user.uid).then(user => {
          page.setState({
            isLoggedIn: true,
            hasFetchedUser: true,
            user
          });
        });
      } else {
        page.setState({
          isLoggedIn: false,
          hasFetchedUser: true
        });
      }
    });
  }

  render() {
    return (
      <div className="PageContainer">
        <Spinner
          loading={this.state.loading || !this.state.hasFetchedUser}
          fillPage={true}
        />
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="Logo" alt="logo" />
          </Link>
          <LoginRegister
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            hasFetchedUser={this.state.hasFetchedUser}
          />
        </header>
        <div className="Content">
          <h1 className="App-title Red Green">DNB Open Source</h1>
          <h2 className="App-intro">Contribute & Innovate</h2>
          <div style={{ marginTop: 30, marginBottom: 30 }}>
            <Line style={{ marginBottom: 10 }} />
            <FilterProjects changeFilter={this.changeFilter} />
          </div>
          <div className="Center">
            <ProjectsDisplay projects={this.state.currentlyViewing} />
          </div>
        </div>
      </div>
    );
  }

  /*
  <div style={{width:"1000px"}}>
  </div>
  <UploadImage type={"headerImage"} id={"0C80Ksr7bjmDSrcLRqEo"} label={"Header Image to project 0C80Ksr7bjmDSrcLRqEo"}/>
  <UploadImage type={"thumbnailImage"} id={"0C80Ksr7bjmDSrcLRqEo"} label={"Thumbnail Image to project 0C80Ksr7bjmDSrcLRqEo"}/>
  <UploadImage type={"headerImage"} id={"Ff7t9Un7xp3scwX70v14"} label={"Header Image to project Ff7t9Un7xp3scwX70v14"}/>
  <UploadImage type={"thumbnailImage"} id={"Ff7t9Un7xp3scwX70v14"} label={"Thumbnail Image to project Ff7t9Un7xp3scwX70v14"}/>
  <UploadImage type={"headerImage"} id={"KB6iqfWRNQNIKYuTxeQ5"} label={"Header Image to project KB6iqfWRNQNIKYuTxeQ5"}/>
  <UploadImage type={"thumbnailImage"} id={"KB6iqfWRNQNIKYuTxeQ5"} label={"Thumbnail Image to project KB6iqfWRNQNIKYuTxeQ5"}/>
  <UploadImage type={"headerImage"} id={"UfXbdgmpamNF7GmjURP1"} label={"Header Image to project UfXbdgmpamNF7GmjURP1"}/>
  <UploadImage type={"thumbnailImage"} id={"UfXbdgmpamNF7GmjURP1"} label={"Thumbnail Image to project UfXbdgmpamNF7GmjURP1"}/>

  */

  changeFilter = picked => {
    if (picked === "all") {
      this.setState({ currentlyViewing: this.state.allProjects });
    } else if (picked === "live") {
      this.setState({ currentlyViewing: this.state.liveProjects });
    } else {
      this.setState({ currentlyViewing: this.state.graduateProjects });
    }
  };
}

export default HomePage;
