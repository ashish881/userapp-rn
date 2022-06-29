import axios from 'axios';
import {
  GET_USERS_LIST,
  ADD_TO_BOOKMARK_LIST,
  REMOVE_FROM_BOOKMARK_LIST,
  GET_USERS_LIST_ON_REFRESH,
} from '../types';

import {BASE_URL} from '../../config';

export const getUserListAction = start => {
  try {
    return async dispatch => {
      const response = await axios.get(
        `${BASE_URL}?per_page=10&since=${start}`,
      );
      if (response.data) {
        if (start == 0) {
          dispatch({
            type: GET_USERS_LIST_ON_REFRESH,
            payload: response.data,
          });
        } else {
          dispatch({
            type: GET_USERS_LIST,
            payload: response.data,
          });
        }
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const addBookmark = user => dispatch => {
  dispatch({
    type: ADD_TO_BOOKMARK_LIST,
    payload: user,
  });
};

export const removeBookmark = user => dispatch => {
  dispatch({
    type: REMOVE_FROM_BOOKMARK_LIST,
    payload: user,
  });
};
