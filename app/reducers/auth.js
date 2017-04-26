// @flow
import {
  AUTH_TRY,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_REGISTER_TRY,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
  AUTH_LOGOUT,
} from '../actions/authActions';

require('../libraries/clickhook-api');

const defaultState = {
  token: '',
  error: '',
  loading: false,
};
let error;

export default function auth(state, action) {

  console.info(action);

  switch (action.type) {
    case AUTH_TRY:
      return Object.assign({}, defaultState, {loading: true});
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        loading: false,
      };
    case AUTH_ERROR:
      error = action.error.message || 'Login failed';
      return Object.assign({}, defaultState, {loading: false, error});
    case AUTH_REGISTER_TRY:
      return Object.assign({}, defaultState, {loading: true});
    case AUTH_REGISTER_SUCCESS:
      // nothing changes because login action is fired automatically
      return state;
    case AUTH_REGISTER_ERROR:
      error = action.error || 'Register failed';
      return Object.assign({}, defaultState, {loading: false, error});
    case AUTH_LOGOUT:
      return defaultState;
    default:
      return state || defaultState;
  }
}
