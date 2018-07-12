import React, { Component } from "react";
import "../resources/fonts.css";
import "../resources/colors.css";
import "../resources/Main.css";
import "./Seeking.css"

class Seeking extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="TopHeader">
                    <h2 style={{ float: "left" }}>
                        Looking for
                    </h2>
                    <button style={{ float: "right" }} className="SeeThroughBtn" onClick={this.mailContact}>
                        <h3>
                            Contact
                        </h3>
                    </button>

                </div>
                <div className="SubContainer">
                    <h3>
                        > Back-end programmer
                </h3><br />
                    <h3>
                        > UX designer
                </h3><br />
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