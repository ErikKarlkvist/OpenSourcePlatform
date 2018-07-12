import React, { Component } from "react";
import "../resources/fonts.css";
import "../resources/colors.css";
import "./AnimatedMenu.css";
import "../resources/Main.css";

class Seeking extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={{ padding: "40px" }}>
                    <h2 style={{ float: "left" }}>
                        Looking for
                    </h2>
                    <button style={{ float: "right" }} className="SeeThroughBtn" onClick={this.mailContact}>
                        <h3>
                            Contact
                        </h3>
                    </button>

                </div>
                <div style={{ clear: "both", marginLeft: "5%", marginTop: "5%" }}>
                    <h4>
                        > Back-end programmer
                </h4><br />
                    <h4>
                        > UX designer
                </h4><br />
                    <p style={{ color: "white" }}>
                        Is this you? Don’t hesitate to contact us and join the team.
                </p>
                </div>

            </div >
        );
    }
    mailContact = () => {
        window.location = "mailto:xyz.dnb.no";
    };
}
export default Seeking;