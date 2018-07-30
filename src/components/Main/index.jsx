import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../actions";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentpage: 1,
      totalpage: 1
    };
  }

  componentDidMount() {
    // 마운트하고 페이지 전체 리스트 불러오는 부분 실행
    this.loadTotalPage();

    // 몇번째 페이지인지를 getPostFetch props에 넣어서 실행
    this.props.getPostFetch(this.state.currentpage);
  }

  // 페이지 전체 리스트 개수를 불러오는 부분
  loadTotalPage = () => {
    axios
      .get("http://localhost:3001/api/post/pages")
      .then(res => {
        console.log(res.data);
        this.setState({ totalpage: res.data });
      })
      .catch(err => console.log(err));
  };

  // 페이지 이동할 때 실행됨
  // currentpage state애 현재 변경할 page를 넣어주고, getPostFetch를 실행해서 해당 페이지의 리스트를 불러옴
  onChange = page => {
    this.setState({
      currentpage: page
    });
    this.props.getPostFetch(page);
  };

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
            {localStorage.getItem("jwtToken") ? (
              <Link to="/create">
                <Button color="primary">Create</Button>
              </Link>
            ) : (
              <Link to="/create">
                <Button color="primary" disabled>
                  Create
                </Button>
              </Link>
            )}
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
          <Col xs="6">
            <Pagination
              onChange={this.onChange}
              current={this.state.currentpage}
              total={this.state.totalpage}
              pageSize={5}
            />
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
    getPostFetch: current => {
      dispatch(actions.getPostFetch(current));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
