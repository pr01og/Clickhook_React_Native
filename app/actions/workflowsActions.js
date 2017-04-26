//@flow

export const WORKFLOWS_FETCH_TRY = 'WORKFLOWS_FETCH_TRY';
export const WORKFLOWS_FETCH_SUCCESS = 'WORKFLOWS_FETCH_SUCCESS';
export const WORKFLOWS_FETCH_ERROR = 'WORKFLOWS_FETCH_ERROR';

export const WORKFLOWS_ADD_TRY = 'WORKFLOWS_ADD_TRY';
export const WORKFLOWS_ADD_SUCCESS = 'WORKFLOWS_ADD_SUCCESS';
export const WORKFLOWS_ADD_ERROR = 'WORKFLOWS_ADD_ERROR';

export const WORKFLOWS_UPDATE_TRY = 'WORKFLOWS_UPDATE_TRY';
export const WORKFLOWS_UPDATE_SUCCESS = 'WORKFLOWS_UPDATE_SUCCESS';
export const WORKFLOWS_UPDATE_ERROR = 'WORKFLOWS_UPDATE_ERROR';

import {
  clickhook_get_workflows,
  clickhook_create_instance,
  clickhook_update_instance,
} from './../libraries/clickhook-api';
import {leadsFetch} from './leadsActions';
import {stagesFetch} from './stagesActions';

export function workflowsFetch(token: string) {

  return dispatch => {

    dispatch({type: WORKFLOWS_FETCH_TRY});

    clickhook_get_workflows(token)
      .then(data => {
        dispatch(workflowsFetchSuccess(token, data.workflows, data.user_statistics));
      })
      .catch(e => {
        dispatch(workflowsFetchError(e))
      });

  };

}

export function workflowsFetchSuccess(token: string, workflows: array, user_statistics: array) {

  return dispatch => {

    let stage_ids = [];
    workflows.forEach(workflow => {
      workflow.stage_ids.forEach(stage_id => {
        if (stage_ids.indexOf(stage_id) === -1) {
          stage_ids.push(stage_id);
        }
      });
    });

    dispatch(stagesFetch(token, stage_ids));
    dispatch({type: WORKFLOWS_FETCH_SUCCESS, workflows, user_statistics});
  };

}

export function workflowsFetchError(error) {
  return {
    type: WORKFLOWS_FETCH_ERROR,
    error,
  };
}

export function workflowsAdd(token: string,
                             lead_id: number,
                             deal_value: number,
                             stage_id: number,
                             workflow_id: number,
                             lost_reason: string,
                             assigned_to_id: number,
                             page: number,
                             search_important_only: boolean,
                             search: string,
                             filter_workflows: array,
                             filter_tags: array,
                             filter_sources: array) {

  return dispatch => {

    dispatch({type: WORKFLOWS_ADD_TRY});

    clickhook_create_instance(token, lead_id, deal_value, stage_id, workflow_id, lost_reason, assigned_to_id)
      .then(data => {
        dispatch(leadsFetch(token, page, search, search_important_only, filter_workflows, filter_tags, filter_sources));
        dispatch(workflowsAddSuccess());
      })
      .catch(e => {
        dispatch(workflowsAddError(e))
      });

  };

}
export function workflowsAddSuccess() {
  return {
    type: WORKFLOWS_ADD_SUCCESS,
  };
}

export function workflowsAddError(error) {
  return {
    type: WORKFLOWS_ADD_ERROR,
    error,
  };
}

export function workflowsUpdate(token: string,
                                instance_id: string,
                                deal_value: number,
                                stage_id: number,
                                workflow_id: number,
                                lost_reason: string,
                                assigned_to_id: number,
                                page: number,
                                search: string,
                                search_important_only: boolean,
                                filter_workflows: array,
                                filter_tags: array,
                                filter_sources: array) {
  return dispatch => {

    dispatch({type: WORKFLOWS_UPDATE_TRY});

    clickhook_update_instance(token, instance_id, deal_value, stage_id, workflow_id, lost_reason, assigned_to_id)
      .then(data => {
        dispatch(leadsFetch(token, page, search, search_important_only, filter_workflows, filter_tags, filter_sources));
        dispatch(workflowsUpdateSuccess());
      })
      .catch(e => {
        dispatch(workflowsUpdateError(e))
      });

  };

}
export function workflowsUpdateSuccess() {
  return {type: WORKFLOWS_UPDATE_SUCCESS};
}

export function workflowsUpdateError(error) {
  return {
    type: WORKFLOWS_UPDATE_ERROR,
    error,
  };
}

