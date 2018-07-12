import React, { Component } from "react";
import "../resources/fonts.css";
import "../resources/colors.css";
import "./AnimatedMenu.css";
import "../resources/Main.css";

class Seeking extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            term: ""
        };
    }

    render() {
        return (
            <div>
                <div>
                    <button className="SeeThroughBtn" onClick={this.joinProject} />
                    <h2>
                        Seeking!!!
                </h2>
                </div>
                <h4>
                    > Back-end programmer
                </h4><br />
                <h4>
                    > UX designer
                </h4><br />
                <p>
                    Is this you? Don’t hesitate to contact us and join the team.
                </p>

            </div>
        );
    }
}
export default Seeking;