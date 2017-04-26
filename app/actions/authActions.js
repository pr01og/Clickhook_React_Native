export const AUTH_TRY = 'AUTH_TRY';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export const AUTH_REGISTER_TRY = 'AUTH_REGISTER_TRY';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_ERROR = 'AUTH_REGISTER_ERROR';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';

import {clickhook_get_token, clickhook_register_urer} from './../libraries/clickhook-api';
import {Actions, ActionConst} from 'react-native-router-flux'
import {userGetActive} from './userActions';
import {leadsFetch} from './leadsActions';

export function authTry(email, password) {
  return dispatch => {
    dispatch({type: AUTH_TRY});

    clickhook_get_token(email, password)
      .then(data => {
        dispatch(authSuccess(data.access_token));
        dispatch(leadsFetch(data.access_token));
        Actions.leads({type: ActionConst.RESET});
      })
      .catch(e => {
        dispatch(authError(e))
      });

  };
}

export function authRegisterTry(email, password, name) {
  return dispatch => {
    dispatch({type: AUTH_REGISTER_TRY});

    clickhook_register_urer(email, password, name)
      .then(data => {
        dispatch({type: AUTH_REGISTER_SUCCESS});
        // console.warn('#kldjks auth data: ', data);
        dispatch(authTry(email, password));
      })
      .catch(e => {
        let error = e && e.errors ? e.errors[0] : 'Registration failed';
        dispatch({ type: AUTH_REGISTER_ERROR, error});
      });

  };
}

export function authSuccess(token: string) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function authError(error: string) {
  return {
    type: AUTH_ERROR,
    error,
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}
