//@flow

export const NOTES_FETCH_TRY = 'NOTES_FETCH_TRY';
export const NOTES_FETCH_SUCCESS = 'NOTES_FETCH_SUCCESS';
export const NOTES_FETCH_ERROR = 'NOTES_FETCH_ERROR';

export const NOTES_CREATE_TRY = 'NOTES_CREATE_TRY';
export const NOTES_CREATE_SUCCESS = 'NOTES_CREATE_SUCCESS';
export const NOTES_CREATE_ERROR = 'NOTES_CREATE_ERROR';

export const NOTES_UPDATE_TRY = 'NOTES_UPDATE_TRY';
export const NOTES_UPDATE_SUCCESS = 'NOTES_UPDATE_SUCCESS';
export const NOTES_UPDATE_ERROR = 'NOTES_UPDATE_ERROR';

import {
  clickhook_get_lead_notes,
  clickhook_create_note,
  clickhook_update_note,
} from './../libraries/clickhook-api';
// import {Actions} from 'react-native-router-flux';

export function notesFetch(token: string, lead_id: string) {
  return dispatch => {

    dispatch({type: NOTES_FETCH_TRY, lead_id});

    clickhook_get_lead_notes(token, lead_id)
      .then(data => {
        console.log('#sd424d41sf notes fetched: ', data);
        dispatch(notesFetchSuccess(data.attachments, data.notes));
      })
      .catch(e => {
        dispatch(notesFetchError(e))
      });

  };
}

export function notesFetchSuccess(attachments, notes) {
  return {
    type: NOTES_FETCH_SUCCESS,
    attachments,
    notes,
  };
}

export function notesFetchError(error) {
  return {
    type: NOTES_FETCH_ERROR,
    error,
  };
}


export function notesCreate(token: string, text: string, lead_id: number) {
  return dispatch => {

    dispatch({type: NOTES_CREATE_TRY});

    clickhook_create_note(token, text, lead_id)
      .then(data => {
        if (data && data.error_message) {
          dispatch(notesAddError(data.error_message))
        } else {
          dispatch(notesCreateSuccess());
          dispatch(notesFetch(token, lead_id));
        }
      })
      .catch(e => {
        console.log('#2g243g2442gs error: ', e);
        dispatch(notesCreateError('Note not saved. Please try again.'));
      });

  };

}

export function notesCreateSuccess() {
  return {
    type: NOTES_CREATE_SUCCESS,
  };
}

export function notesCreateError(error_message) {
  return {
    type: NOTES_CREATE_ERROR,
    error_message,
  };
}


export function notesUpdate(token: string, text: string, lead_id: number, note_id: number) {
  return dispatch => {

    dispatch({type: NOTES_UPDATE_TRY});

    clickhook_update_note(token, text, note_id)
      .then(data => {
        if (data && data.error_message) {
          dispatch(notesAddError(data.error_message))
        } else {
          dispatch(notesUpdateSuccess());
          dispatch(notesFetch(token, lead_id));
        }
      })
      .catch(e => {
        console.log('#g1g4s4g4 error: ', e);
        dispatch(notesUpdateError('Note not saved. Please try again.'));
      });

  };

}

export function notesUpdateSuccess() {
  return {
    type: NOTES_UPDATE_SUCCESS,
  };
}

export function notesUpdateError(error_message) {
  return {
    type: NOTES_UPDATE_ERROR,
    error_message,
  };
}
