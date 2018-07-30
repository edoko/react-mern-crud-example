import React, { Component } from "react";
import axios from "axios";
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
import history from "../../history";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      name: "",
      email: "",
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

    const { username, password, name, email } = this.state;

    axios
      .post("http://localhost:3001/api/auth/register", {
        username,
        password,
        name,
        email
      })
      .then(res => {
        this.setState({ alert: "" });
        history.push("/login");
      })
      .catch(err => {
        if (err.response.status === 600) {
          this.setState({ alert: "Username already exists" });
        } else if (err.response.status === 601) {
          this.setState({ alert: "Please input all fields" });
        }
      });
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
              <FormGroup row>
                <Label sm={2}>Name</Label>
                <Col sm={10}>
                  <Input
                    type="test"
                    name="name"
                    placeholder="Name"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>E-mail</Label>
                <Col sm={10}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <div>
                {this.state.alert}
                <br />
              </div>
              <Button type="submit" color="primary">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
