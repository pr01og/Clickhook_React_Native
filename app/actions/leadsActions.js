//@flow

export const LEADS_FETCH_TRY = 'LEADS_FETCH_TRY';
export const LEADS_FETCH_SUCCESS = 'LEADS_FETCH_SUCCESS';
export const LEADS_FETCH_ERROR = 'LEADS_FETCH_ERROR';

export const LEADS_CREATE_TRY = 'LEADS_CREATE_TRY';
export const LEADS_CREATE_SUCCESS = 'LEADS_CREATE_SUCCESS';
export const LEADS_CREATE_ERROR = 'LEADS_CREATE_ERROR';

export const LEADS_UPDATE_TRY = 'LEADS_UPDATE_TRY';
export const LEADS_UPDATE_SUCCESS = 'LEADS_UPDATE_SUCCESS';
export const LEADS_UPDATE_ERROR = 'LEADS_UPDATE_ERROR';

export const LEADS_SHOW_SEARCH = 'LEADS_SHOW_SEARCH';
export const LEADS_HIDE_SEARCH = 'LEADS_HIDE_SEARCH';

export const LEADS_SHOW_SINGLE = 'LEADS_SHOW_SINGLE';

export const LEADS_CHANGE_SINGLE_VIEW_TAB = 'LEADS_CHANGE_SINGLE_VIEW_TAB';

import {clickhook_get_leads, clickhook_create_lead, clickhook_update_lead} from './../libraries/clickhook-api';
import {Actions} from 'react-native-router-flux';
import {workflowsFetch} from './workflowsActions';
import {userFetch} from './userActions';
import {notesFetch} from './notesActions';
import {tasksFetch} from './tasksActions';

export function leadsFetch(token: string,
                           page: number = 1,
                           search: string = '',
                           search_important_only: boolean,
                           filter_workflows: array,
                           filter_tags: array,
                           filter_sources: array) {

  return dispatch => {

    dispatch({type: LEADS_FETCH_TRY, page, search, search_important_only, filter_workflows, filter_tags, filter_sources});
    dispatch(workflowsFetch(token));
    dispatch(userFetch(token));

    clickhook_get_leads(token, page, search, search_important_only, filter_workflows, filter_tags, filter_sources)
      .then(data => {
        dispatch(leadsFetchSuccess(data.leads, data.instances, data.meta));
      })
      .catch(e => {
        dispatch(leadsFetchError(e))
      });

  };

}

export function leadsShowSingle(token: string, lead_id: string, title: title) {
  return dispatch => {
    setTimeout(() => Actions.refresh({title: title}), 10);
    dispatch(notesFetch(token, lead_id));
    dispatch(tasksFetch(token, lead_id));
    dispatch({type: LEADS_SHOW_SINGLE, lead_id});
  };
}

export function leadsChangeSingleViewTab(tab, title) {
  // Actions.refresh({title});
  return {
    type: LEADS_CHANGE_SINGLE_VIEW_TAB,
    tab,
  }
}

export function leadsShowSearch() {
  return {
    type: LEADS_SHOW_SEARCH,
  };
}

export function leadsHideSearch() {
  return {
    type: LEADS_HIDE_SEARCH,
  };
}

export function leadsFetchSuccess(leads, instances, meta) {
  return {
    type: LEADS_FETCH_SUCCESS,
    leads,
    instances,
    meta,
  };
}

export function leadsFetchError(error) {
  return {
    type: LEADS_FETCH_ERROR,
    error,
  };
}


export function leadsCreate(token: string,
                            name: string,
                            email: string,
                            phone: string,
                            company: string,
                            page: number = 1,
                            search: string = '',
                            search_important_only: boolean = false,
                            workflows: boolean = [],
                            tags: boolean = [],
                            sources: boolean = []) {

  return dispatch => {

    dispatch({type: LEADS_CREATE_TRY});

    clickhook_create_lead(token, name, email, phone, company)
      .then(data => {
        if (data && data.error_message) {
          dispatch(leadsCreateError(data.error_message))
        } else {
          dispatch(leadsCreateSuccess());
          dispatch(leadsFetch(token, page, search, search_important_only, workflows, tags, sources));
        }
      })
      .catch(e => {
        console.log('#1fd1sf error: ', e);
        dispatch(leadsCreateError('Lead not saved. Please try again.'));
      });

  };

}

export function leadsCreateSuccess() {
  return {
    type: LEADS_CREATE_SUCCESS,
  };
}

export function leadsCreateError(error_message) {
  return {
    type: LEADS_CREATE_ERROR,
    error_message,
  };
}

export function leadsUpdateSingle({
  token, id, name, email, phone, source, company, city, website, archived,
  state, address, zip, tags, email_hash, custom_fields, favorited,
  page, search, search_important_only, filter_workflows, filter_tags, filter_sources
}) {

  return dispatch => {

    dispatch({type: LEADS_UPDATE_TRY});

    clickhook_update_lead({
      token, id, name, email, phone, source, company, city, website, archived,
      state, address, zip, tags, email_hash, custom_fields, favorited
    })
      .then(data => {
        if (data && data.error_message) {
          dispatch(leadsUpdateSingleError(data.error_message))
        } else {
          dispatch(leadsUpdateSingleSuccess());
          dispatch(leadsFetch(token, page, search, search_important_only, filter_workflows, filter_tags, filter_sources));
        }
      })
      .catch(e => {
        console.log('#1fd1sf error: ', e);
        dispatch(leadsUpdateSingleError('Lead not saved. Please try again.'));
      });

  };
}

export function leadsUpdateSingleSuccess() {
  return {
    type: LEADS_UPDATE_SUCCESS,
  };
}

export function leadsUpdateSingleError(error_message) {
  return {
    type: LEADS_UPDATE_ERROR,
    error_message,
  };
}
