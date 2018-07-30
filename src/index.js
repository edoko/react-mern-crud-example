import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import Main from "./components/Main/index.jsx";
import Edit from "./components/Edit/index.jsx";
import Create from "./components/Create/index.jsx";
import Show from "./components/Show/index.jsx";
import Login from "./components/Login/index.jsx";
import Register from "./components/Register/index.jsx";
import stores from "./reducers";
import history from "./history";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// redux-thunk middleware와 함께 스토어 생성
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(
  stores,
  // redux devtools를 사용하기 위해 추가
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/" component={App} />
        <Route exact path="/" component={Main} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/create" component={Create} />
        <Route path="/post/:id" component={Show} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
