//@flow

export const STAGES_FETCH_TRY = 'STAGES_FETCH_TRY';
export const STAGES_FETCH_SUCCESS = 'STAGES_FETCH_SUCCESS';
export const STAGES_FETCH_ERROR = 'STAGES_FETCH_ERROR';

import {
  clickhook_get_stages,
} from './../libraries/clickhook-api';

export function stagesFetch(token: string, ids: array) {
  return dispatch => {

    dispatch({type: STAGES_FETCH_TRY});

    clickhook_get_stages(token, ids)
      .then(data => {
        dispatch(stagesFetchSuccess(data));
      })
      .catch(e => {
        dispatch(stagesFetchError(e))
      });

  };
}

export function stagesFetchSuccess(stages) {
  return {
    type: STAGES_FETCH_SUCCESS,
    stages,
  };
}

export function stagesFetchError(error) {
  return {
    type: STAGES_FETCH_ERROR,
    error,
  };
}
