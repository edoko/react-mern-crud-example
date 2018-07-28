import { combineReducers } from "redux";
import fetch from "./fetch";

// 리듀서 합치기
const index = combineReducers({
  fetch
});

export default index;
