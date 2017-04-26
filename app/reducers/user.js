import {
  USER_FETCH_SUCCESS,
  USER_FETCH_TRY,
  USER_FETCH_ERROR,
} from './../actions/userActions';

const defaultState = {
  accounts: [],
  user: {},
  users: [],
  error: '',
  loading: true,
};

export default function user(state, action) {
  switch (action.type) {
    case USER_FETCH_TRY:
      return {
        ...state,
        error: '',
        loading: true,
      };
      break;
    case USER_FETCH_SUCCESS:
      return {
        ...defaultState,
        accounts: action.accounts,
        user: action.user,
        users: action.users.filter(x => x.banned === false),
        loading: false,
      };
      break;
    case USER_FETCH_ERROR:
      return {
        ...state,
        error: 'fetch_error',
        loading: false,
      };
      break;
    default:
      return state || defaultState;
  }
};
