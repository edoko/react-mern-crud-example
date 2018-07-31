import React, { Component } from "react";
import "./App.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "./history";
import * as actions from "./actions";

// 헤더 + 감싸는 컴포넌트
class App extends Component {
  componentDidMount() {
    this.props.preserveToken();
  }

  logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("myUserName");
    history.push("/");
  };

  render() {
    return (
      <div>
        <div className="header">
          <h1>MERN CRUD Example</h1>
          <br />
          <span>Credit: me@komalab.io</span>
          <br />
          <br />
          {localStorage.getItem("jwtToken") ? (
            <Button color="primary" onClick={this.logout}>
              Logout
            </Button>
          ) : (
            <div>
              <Link to="/login">
                <Button color="primary">Login</Button>
              </Link>
              <Link to="/register">
                <Button color="primary">Register</Button>
              </Link>
            </div>
          )}
        </div>
        {/* 하위 컴포넌트들 불러오기 */}
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    preserveToken: () => {
      dispatch(actions.preserveToken());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
