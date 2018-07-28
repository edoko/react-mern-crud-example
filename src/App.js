import React from "react";
import "./App.css";

// 헤더 + 감싸는 컴포넌트
const App = props => {
  return (
    <div>
      <div className="header">
        <h1>React.js + Redux + MERN CRUD Example</h1>
        <br />
        <span>Credit: me@komalab.io</span>
      </div>
      {/* 하위 컴포넌트들 불러오기 */}
      {props.children}
    </div>
  );
};

export default App;
