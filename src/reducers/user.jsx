import {
  PRESERVE_TOKEN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/index.jsx";
import axios from "axios";

const initialState = {
  username: "",
  alert: ""
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case PRESERVE_TOKEN:
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwtToken"
      );
      return state;
    case LOGIN_SUCCESS:
      localStorage.setItem("jwtToken", action.data.token);
      localStorage.setItem("myUserName", action.username);
      return {
        username: action.username
      };
    case LOGIN_FAILURE:
      return {
        username: "",
        alert: "Login failed."
      };
    default:
      return state;
  }
}
