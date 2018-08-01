import React, { Component } from "react";
import InputTextBox from "../../components/common/InputTextBox";
import Readme from "../project/Readme";
import HeaderWithTooltip from "../../components/common/HeaderWithTooltip";

const Container = props => {
  const style = {
    textAlign: "left",

    paddingBottom: "80px"
  };
  return <div style={style}>{props.children}</div>;
};

const InvalidText = () => {
  const style = {
    color: "red"
  };
  return <p style={style}>Link is not a .md file</p>;
};

const TooltipText = {
  Readme:
    'This link will display the readme on your github page, updated dynamically.<br />You find the .md file by opening the readme file, then pressing the "Raw" button above the file.<br />Example: https://raw.githubusercontent.com/ErikKarlkvist/OpenSourcePlatform/master/README.md'
};
class ReadmeInput extends Component {
  constructor() {
    super();
    this.state = { value: "", validLink: false };
  }

  handleInputChange = e => {
    const link = e.target.value;
    this.setState({ value: link });
    this.checkLink(link);
    this.props.handleInputChange(e);
  };

  checkLink = link => {
    this.setState({ validLink: link.split(".").slice(-1)[0] === "md" });
  };

  render() {
    return (
      <Container>
        <div style={{ marginTop: "40px" }}>
          <HeaderWithTooltip tooltip={TooltipText.Readme}>
            <h3>Readme (optional)</h3>
          </HeaderWithTooltip>
          <InputTextBox
            handleInputChange={this.handleInputChange}
            name="readmeURL"
            value={this.state.value}
            placeholder="Link to raw README.md"
            className="ReadmeInput"
          />
          {this.state.validLink && (
            <Readme
              project={{ readmeURL: this.state.value }}
              projectName={this.props.values.projectName}
            />
          )}
          {!this.state.validLink &&
            this.state.value.length > 3 && <InvalidText />}
        </div>
      </Container>
    );
  }
}

export default ReadmeInput;
