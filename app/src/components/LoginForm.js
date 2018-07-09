import React, { Component } from "react";
import {Form, FormGroup, ControlLabel, FormControl, Col,Checkbox, Button} from 'react-bootstrap';
import "../resources/fonts.css";

class SignUpView extends Component {
 constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div style={styles.background} onClick={this.props.hide}>
        <div style={styles.container} onClick={()=>{}}>
          <div>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
                <Col sm={10}>
                <FormControl type="email" placeholder="Email" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">Sign in</Button>
              </Col>
            </FormGroup>
          </Form>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    height: "100%",
    width: "100%",
    display:"flex",
    justifyContent: "center",
    alignItems:"center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  container: {
    height: "400px",
    width: "400px",
    alignItems: "center",
    padding: "(1, 1, 1, 1)",
  },
};


export default SignUpView;