//@flow

export const TASKS_FETCH_TRY = 'TASKS_FETCH_TRY';
export const TASKS_FETCH_SUCCESS = 'TASKS_FETCH_SUCCESS';
export const TASKS_FETCH_ERROR = 'TASKS_FETCH_ERROR';

export const TASKS_CREATE_TRY = 'TASKS_CREATE_TRY';
export const TASKS_CREATE_SUCCESS = 'TASKS_CREATE_SUCCESS';
export const TASKS_CREATE_ERROR = 'TASKS_CREATE_ERROR';

export const TASKS_UPDATE_TRY = 'TASKS_UPDATE_TRY';
export const TASKS_UPDATE_SUCCESS = 'TASKS_UPDATE_SUCCESS';
export const TASKS_UPDATE_ERROR = 'TASKS_UPDATE_ERROR';

import {
  clickhook_get_lead_tasks,
  clickhook_create_task,
  clickhook_update_task,
} from './../libraries/clickhook-api';
// import {Actions} from 'react-native-router-flux';

export function tasksFetch(token: string, lead_id: string) {
  return dispatch => {

    dispatch({type: TASKS_FETCH_TRY, lead_id});

    clickhook_get_lead_tasks(token, lead_id)
      .then(tasks => {
        console.log('#f2232332f tasks fetched: ', tasks);
        dispatch(tasksFetchSuccess(tasks));
      })
      .catch(e => {
        dispatch(tasksFetchError(e))
      });

  };
}

export function tasksFetchSuccess(tasks) {
  return {
    type: TASKS_FETCH_SUCCESS,
    tasks,
  };
}

export function tasksFetchError(error) {
  return {
    type: TASKS_FETCH_ERROR,
    error,
  };
}

export function taskToggleCompleted(token: string, task_id: number, completed: bool, lead_id: number) {
  return dispatch => {

    dispatch({type: TASKS_UPDATE_TRY, task_id, completed});

    clickhook_update_task(token, null, completed, task_id)
      .then(data => {
        if (data && data.error_message) {
          dispatch(tasksUpdateError(data.error_message))
        } else {
          dispatch(tasksUpdateSuccess());
          dispatch(tasksFetch(token, lead_id));
        }
      })
      .catch(e => {
        console.log('#45g45ghgr error: ', e);
        dispatch(tasksUpdateError('Task not saved. Please try again.'));
      });

  };
}

export function tasksCreate(token: string,
                            name: string,
                            description: string,
                            lead_id: number,
                            assigned_by_id: string,
                            assigned_to_id: string,
                            label: string,
                            due: date,
                            is_reminder: bool) {
  return dispatch => {

    dispatch({type: TASKS_CREATE_TRY});

    clickhook_create_task(token, name, description, lead_id, assigned_by_id, assigned_to_id, label, due, is_reminder)
      .then(data => {

        console.log('#41fd41dsf4 crate task result: ', data);

        if (data && data.error_message) {
          dispatch(notesAddError(data.error_message))
        } else {
          dispatch(tasksCreateSuccess());
          dispatch(tasksFetch(token, lead_id));
        }
      })
      .catch(e => {
        console.log('#2g243g2442gs error: ', e);
        dispatch(tasksCreateError('Note not saved. Please try again.'));
      });

  };

}

export function tasksCreateSuccess() {
  return {
    type: TASKS_CREATE_SUCCESS,
  };
}

export function tasksCreateError(error_message) {
  return {
    type: TASKS_CREATE_ERROR,
    error_message,
  };
}

export function tasksUpdate(token: string, text: string, lead_id: number, note_id: number) {
  return dispatch => {

    dispatch({type: TASKS_UPDATE_TRY});

    clickhook_update_task(token, text, note_id)
      .then(data => {
        if (data && data.error_message) {
          dispatch(notesAddError(data.error_message))
        } else {
          dispatch(tasksUpdateSuccess());
          dispatch(notesFetch(token, lead_id));
        }
      })
      .catch(e => {
        console.log('#g1g4s4g4 error: ', e);
        dispatch(notesUpdateError('Note not saved. Please try again.'));
      });

  };

}

export function tasksUpdateSuccess() {
  return {
    type: TASKS_UPDATE_SUCCESS,
  };
}

export function tasksUpdateError(error_message) {
  return {
    type: TASKS_UPDATE_ERROR,
    error_message,
  };
}
