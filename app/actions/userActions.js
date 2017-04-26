//@flow

export const USER_FETCH_TRY = 'USER_FETCH_TRY';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR';

import {clickhook_get_user} from './../libraries/clickhook-api';


export function userFetch(token: string) {

  return dispatch => {

    dispatch({type: USER_FETCH_TRY});

    clickhook_get_user(token)
      .then(data => {
        dispatch(userFetchSuccess(data.accounts, data.user, data.users));
      })
      .catch(e => {
        dispatch(userFetchError(e))
      });

  };

}
export function userFetchSuccess(accounts: array, user: object, users: array) {
  return {
    type: USER_FETCH_SUCCESS,
    accounts,
    user,
    users,
  };
}

export function userFetchError(error) {
  return {
    type: USER_FETCH_ERROR,
    error,
  };
}
