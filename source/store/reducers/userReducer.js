import {ADD_USER, SET_CURRENT_USER, SET_SCORE} from '../types/userType';

const init = {
  users: [
    {name: 'Name 1', score: 20},
    {name: 'Name 2', score: 26},
    {name: 'Name 3', score: 30},
  ],
  currentUser: undefined,
};

export default function userReducer(state = init, action) {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }

    case SET_SCORE: {
      let users = state.users.map(user => {
        if (user.name == action.payload.name) {
          return action.payload;
        } else {
          return user;
        }
      });

      return {
        ...state,
        currentUser: action.payload,
        users: users,
      };
    }

    default:
      return state;
  }
}
