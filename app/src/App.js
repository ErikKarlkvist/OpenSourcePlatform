import React, { Component } from "react";

//login("henninnenesgrd@gmail.com", "123456789");
//https://api.trello.com/1/members/me/?key=85873074232e857f4e364a3ef1b545a3&token=ff6a08c9b2fc1df53138d4f788122032fd7d7ae93bb6919f1d81d1c5cd8af10b
import Routing from "./pages/Routing";
import "./resources/Fonts/fonts.css";
import "./resources/colors.css";
import "./resources/Styles/Main.css";
import "./resources/Styles/Input.css";
import "./resources/Styles/Buttons.css";

class App extends Component {
  render() {
    return <Routing />;
  }
}

export default App;
