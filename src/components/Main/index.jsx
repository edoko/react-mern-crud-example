import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Main extends Component {
  componentDidMount() {
    this.props.getPostFetch();
  }

  render() {
    if (!this.props.posts) {
      return <div>No post!</div>;
    }

    return (
      <Container>
        <Row>
          <Col xs="12" style={{ textAlign: "center" }}>
            <h1>POST LIST</h1>
          </Col>
          <Col xs="12" style={{ marginBottom: 20 }}>
            <Link to="/create">
              <Button color="primary">Create</Button>
            </Link>
          </Col>
          <Col xs="4">
            {this.props.posts.map((post, index) => (
              <div key={index} style={{ border: "1px solid black" }}>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
                <br />
                <span>내용: {post.content}</span>
                <br />
                <span>글쓴이: {post.writer}</span>
                <br />
                <span>글쓴날짜: {post.write_date}</span>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

// redux store의 state를 props로 가져오기
const mapStateToProps = state => {
  return {
    posts: state.fetch.posts
  };
};

// redux dispatch를 props로 가져오기
const mapDispatchToProps = dispatch => {
  return {
    getPostFetch: () => {
      dispatch(actions.getPostFetch());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
