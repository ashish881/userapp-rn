import {
  GET_USERS_LIST,
  ADD_TO_BOOKMARK_LIST,
  REMOVE_FROM_BOOKMARK_LIST,
  GET_USERS_LIST_ON_REFRESH,
} from '../types';

const initialState = {
  userList: [],
  bookmarks: [],
};

function userListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_LIST:
      return {...state, userList: [...state.userList, ...action.payload]};
    case GET_USERS_LIST_ON_REFRESH:
      return {...state, userList: action.payload};
    case ADD_TO_BOOKMARK_LIST:
      return {...state, bookmarks: [...state.bookmarks, action.payload]};
    case REMOVE_FROM_BOOKMARK_LIST:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          user => user.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}

export default userListReducer;
