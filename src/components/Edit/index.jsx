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

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.post.title,
      writer: this.props.post.writer,
      content: this.props.post.content
    };
  }

  componentDidMount() {
    this.props.getPostDetailFetch(this.props.match.params.id);
  }

  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.editPost(
      this.state.title,
      this.state.writer,
      this.state.content,
      this.props.match.params.id
    );
  };

  handleChange = value => {
    this.setState({ content: value });
  };

  render() {
    if (!this.props.post) {
      return <div>No post!</div>;
    }

    if (!localStorage.getItem("jwtToken")) {
      return (
        <div style={{ textAlign: "center" }}>
          <h3>Not login!</h3>
        </div>
      );
    }

    if (this.props.post.writer !== localStorage.getItem("myUserName")) {
      return (
        <div>
          <p>You are an unauthorized user.</p>
        </div>
      );
    }

    return (
      <Container>
        <Row>
          <Col xs={12}>
            <h1>EDIT POST</h1>
          </Col>
          <Col xs={12}>
            <Form onSubmit={this.onSubmit}>
              <FormGroup row>
                <Label sm={2}>Title</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="title"
                    defaultValue={this.props.post.title}
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>Writer</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="writer"
                    defaultValue={this.props.post.writer}
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

// redux store의 state를 props로 가져오기
const mapStateToProps = state => {
  return {
    post: state.fetch.post,
    username: state.user.username
  };
};

// redux dispatch를 props로 가져오기
const mapDispatchToProps = dispatch => {
  return {
    getPostDetailFetch: postId => {
      dispatch(actions.getPostDetailFetch(postId));
    },
    editPost: (title, writer, content, postId) => {
      dispatch(actions.editPost(title, writer, content, postId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
