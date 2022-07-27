import store from '../store';
import {ADD_USER, SET_CURRENT_USER, SET_SCORE} from '../types/userType';

export const addUser = name => {
  store.dispatch({
    type: ADD_USER,
    payload: {
      name,
      score: 0,
    },
  });
};

export const setCurrentUser = user => {
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
};

export const setUserScore = user => {
  store.dispatch({
    type: SET_SCORE,
    payload: user,
  });
};
