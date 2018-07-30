import React, { Component } from "react";
import logo from "../../logo.svg";
import { getAllProjects } from "../../backend/projects";
import { getUser } from "../../backend/users.js";
import HeaderMenu from "../common/HeaderMenu";
import Spinner from "../../components/common/Spinner";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "../../backend/firebase";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      currentlyViewing: [],
      loading: true,
      isLoggedIn: false,
      hasFetchedUser: false,
      picked: "all"
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

    this.setupAuthStateChange();
  }

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
        <header className="App-header">
          <Link to="">
            <img src={logo} className="Logo" alt="logo" />
          </Link>
          <HeaderMenu
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            hasFetchedUser={this.state.hasFetchedUser}
          />
        </header>
        <div
          className="Content Center"
          style={{ textAlign: "left", marginTop: "50px" }}
        >
          <h1 className="App-title Red Green">ABOUT</h1>
          <p style={styles.text}>
            ***TODO***ÄNDRA TILL ENGELSKA KANSKE ÄNDRA MÅLGRUPPSFOKUS****** Att
            vara en god teknologibedrift innebär att man måste vara innovativ
            och satsa nya tekniker och idéer, och vill vi därför att ansatta ska
            känna att de har möjligheten och friheten att försöka förverkliga
            sina idéer här på DNB. DNB kan använda sig av sin interna talang och
            för att finna nya innovativa idéer som Vipps - något som andra stora
            teknologi bedrifter som google och facebook satsar hårt på. Det
            lönar sig att satsa på sidoprojekt, applikationer som Gmail, Google
            Maps, Twitter, Slack, och Groupon startade alla som sådana. Vi vill
            ta det ett steg längre och även låta externa utvecklare hjälpa till
            genom open source projekt, där ansatta på DNB kommer på en idé,
            bildar ett team & startar projektet, men låter projektet ligga öppet
            på Github så vilken utvecklare som helst runt om i världen kan ladda
            ner koden, förbättra den och lägga till något de skulle vilja ha.
            Man kan även marknadsföra open source projekten på massa olika
            teknologiska högskolor och rekommendera utvecklare att delta, vilket
            många nog hade tyckt varit kul. Teamet som styr projektet måste
            såklart godkänna alla förändringar, och vissa delar av projekten kan
            såklart inte vara öppet utåt, men vi tror att denna strategi kan
            göra att DNB blir en bedrift som är innovativ, där de ansatta trivs
            och rekommenderar andra att börja jobba, samt hittar nya utvecklare
            som bidragit till projekten.
          </p>
          <h1 style={styles.header}>Why should I contribute</h1>
          <ul>
            <li>
              <h3>as an employee at DNB?</h3>
              <p style={styles.text}>
                ---Gör något du tycker är kul... träffa nya på kontoret.. idk
              </p>
            </li>
            <li>
              <h3>as a student?</h3>
              <p style={styles.text}>
                Kan få jobb på dnb... kan skryta om det på cv...
              </p>
            </li>
            <li>
              <h3>as an external developer?</h3>
              <p style={styles.text}>
                använder du något av projekten i vardagen? Vill du jobba på dnb?
              </p>
            </li>
          </ul>
          <h1 style={styles.header}>How to</h1>
          <ul>
            <li>
              <h3>contribute to a project?</h3>
              <p style={styles.text}>
                All projects on this site are open source. Currently, all
                projects use github to host the code. Simply click "Get the
                Code!" in a project and you'll open that projects github
                repository, where you can clone the code, change something and
                the make a pull request. The owners of each project have to
                accept your change in order for the contribution to be merged
                with the project.
              </p>
            </li>
            <li>
              <h3>become an owner?</h3>
              <p style={styles.text}>
                Only the current owners of a project can manage the owners of a
                project. You can contact them by clicking the "Contact" button
                on the project page. You have to have an account on the platform
                and thus be an employee on DNB in order to become a project
                owner.
              </p>
            </li>
            <li>
              <h3>edit my profile?</h3>
              <p style={styles.text}>
                Simply click on "Your profile" in the menu and then "edit
                profile". From here you can edit your name, description, profile
                image and password.
              </p>
            </li>
            <li>
              <h3>create a project</h3>
              <p style={styles.text}>
                Click on "Create Project" on the menu to the right and fill in
                the following attributes:
              </p>
              <ul style={{ marginTop: "20px" }}>
                <li>
                  <h5>Title</h5>
                  <p style={styles.text}>
                    The title of your project. Max 20 characters.
                  </p>
                </li>
                <li>
                  <h5>Description</h5>
                  <p style={styles.text}>
                    A short description of your project. Max 600 characters.
                  </p>
                </li>
                <li>
                  <h5>Github url (optional)</h5>
                  <p style={styles.text}>
                    {`The url to your github repository where the code is stored. The link must look like this https://github.com/{username}/{repository-name}. A correct link will load the metrics tab where you can click "Get the code!" and "Send in a suggestion" which takes you to the github repository and the repositorys issues where you can create issues (suggestions).`}
                  </p>
                </li>
                <li>
                  <h5>Seeking (optional)</h5>
                  <p style={styles.text}>
                    Do you need some skill that will help you progress in the
                    project? Fill them out here.
                  </p>
                </li>
                <li>
                  <h5>Contact</h5>
                  <p style={styles.text}>
                    The email that the "Contact" button will use when opening
                    the default email application.
                  </p>
                </li>
                <li>
                  <h5>Owners</h5>
                  <p style={styles.text}>
                    The owners of the project. These are the people who are
                    collaborators on github and can accept pull requests. They
                    can also edit the project page on this site.
                  </p>
                </li>
                <li>
                  <h5>Updates (optional)</h5>
                  <p style={styles.text}>
                    Here you can post images of how the project looks like right
                    now, and post updates on how the project is going or other
                    things related to the project.
                  </p>
                </li>
                <li>
                  <h5>Readme (optional)</h5>
                  <p style={styles.text}>
                    Post a link to a raw .md (markdown) file. An example of a
                    raw .md file can be found{" "}
                    <a href="https://raw.githubusercontent.com/ErikKarlkvist/OpenSourcePlatform/master/README.md">
                      here
                    </a>. You can find the raw .md file on github by clicking on
                    the readme in the project structure on github, and then
                    click "Raw" to the right.
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const styles = {
  text: {
    color: "white"
  },
  header: {
    marginTop: "50px"
  }
};

export default HomePage;
