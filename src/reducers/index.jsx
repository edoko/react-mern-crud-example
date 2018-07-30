import { combineReducers } from "redux";
import fetch from "./fetch";
import user from "./user";

// 리듀서 합치기
const index = combineReducers({
  fetch,
  user
});

export default index;
