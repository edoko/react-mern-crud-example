import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      alert: ""
    };
  }

  onChange = event => {
    const state = this.state;

    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onLogin = event => {
    event.preventDefault();

    const { username, password } = this.state;

    this.props.login(username, password);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <h1>LOGIN</h1>
          </Col>
          <Col xs={12}>
            <Form onSubmit={this.onLogin}>
              <FormGroup row>
                <Label sm={2}>Username</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>Password</Label>
                <Col sm={10}>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <div>
                {this.props.alert}
                <br />
              </div>
              <Button type="submit" color="primary">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    alert: state.user.alert
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(actions.login(username, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
