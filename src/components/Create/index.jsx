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
import ReactQuill from "react-quill";
import * as actions from "../../actions";
import "react-quill/dist/quill.snow.css";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      writer: this.props.username,
      content: ""
    };
  }

  // 입력하는 문구들이 자동으로 setState 되게끔
  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  // Send 버튼을 누르면 props 실행
  onSubmit = event => {
    event.preventDefault();
    this.props.createPost(
      this.state.title,
      this.state.writer,
      this.state.content
    );
  };

  handleChange = value => {
    this.setState({ content: value });
  };

  render() {
    if (!localStorage.getItem("jwtToken")) {
      return (
        <div style={{ textAlign: "center" }}>
          <h3>
            Not login!<br />Login, Please!
          </h3>
        </div>
      );
    }

    return (
      <Container>
        <Row>
          <Col xs={12} style={{ textAlign: "center" }}>
            <h1>CREATE POST</h1>
          </Col>
          <Col xs={12}>
            <Form onSubmit={this.onSubmit}>
              <FormGroup row>
                <Label sm={2}>Title</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Add title"
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>Content</Label>
                <Col sm={10}>
                  <ReactQuill
                    value={this.state.content}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <Button type="submit" color="primary">
                Send
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
    username: state.user.username
  };
};

// redux dispatch를 props로 가져오기
const mapDispatchToProps = dispatch => {
  return {
    createPost: (title, writer, content) => {
      dispatch(actions.createPost(title, writer, content));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
