import {
  CREATE_POST_SUCCESS,
  EDIT_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  GET_POST_SUCCESS,
  GET_POST_DETAIL_SUCCESS
} from "../actions/index.jsx";

// 초기값
const initialState = { posts: [], post: [] };

export default function fetch(state = initialState, action) {
  switch (action.type) {
    // 게시글 리스트 불러올 때
    case GET_POST_SUCCESS:
      return { posts: action.posts };
    // 게시글 생성할 때
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        ...action.post
      };
    // 게시글 수정할 때
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        ...action.post
      };
    // 게시글 삭제할 때
    case DELETE_POST_SUCCESS:
      return state;
    // 특정 게시글 불러올 때
    case GET_POST_DETAIL_SUCCESS:
      return { post: action.post };
    default:
      return state;
  }
}
