import {
  LEADS_FETCH_SUCCESS,
  LEADS_FETCH_TRY,
  LEADS_FETCH_ERROR,
  LEADS_CREATE_TRY,
  LEADS_CREATE_SUCCESS,
  LEADS_CREATE_ERROR,
  LEADS_SHOW_SEARCH,
  LEADS_HIDE_SEARCH,
  LEADS_SHOW_SINGLE,
  LEADS_CHANGE_SINGLE_VIEW_TAB,
} from './../actions/leadsActions';

const defaultState = {
  leads: [],
  instances: [],
  meta: {},
  page: 1,
  error: '',
  loading: true,
  search: '',
  search_important_only: false,
  filter_workflows: [],
  filter_tags: [],
  filter_sources: [],
  create_error_message: null,
  create_loading: false,
  show_search: false,
  show_single: 0,
  single_view_tab: 'profile',
};

export default function leads(state, action) {
  switch (action.type) {

    case LEADS_CHANGE_SINGLE_VIEW_TAB:
      return {
        ...state,
        single_view_tab: action.tab,
      };
      break;
    case LEADS_SHOW_SINGLE:
      return {
        ...state,
        show_single: action.lead_id,
        single_view_tab: defaultState.single_view_tab,
      };
      break;
    case LEADS_SHOW_SEARCH:
      return {
        ...state,
        show_search: true,
      };
      break;
    case LEADS_HIDE_SEARCH:
      return {
        ...state,
        show_search: false,
        page: 1,
        search: '',
      };
      break;
    case LEADS_FETCH_TRY:
      return {
        ...state,
        show_search: state.show_search || false,
        page: action.page || 1,
        search: action.search || '',
        search_important_only: action.search_important_only === true,
        filter_workflows: action.filter_workflows || [],
        filter_tags: action.filter_tags || [],
        filter_sources: action.filter_sources || [],
        error: '',
        loading: true,
      };
      break;
    case LEADS_FETCH_SUCCESS:
      return {
        ...state,
        page: state.page || 1,
        show_search: state.show_search || false,
        search: state.search || '',
        search_important_only: state.search_important_only === true,
        filter_workflows: state.filter_workflows || [],
        filter_tags: state.filter_tags || [],
        filter_sources: state.filter_sources || [],
        leads: action.leads,
        instances: action.instances,
        meta: action.meta,
        loading: false,
      };
      break;
    case LEADS_FETCH_ERROR:
      return {
        ...state,
        error: 'fetch_error',
        loading: false,
      };
      break;
    case LEADS_CREATE_TRY:
      return {
        ...state,
        create_error_message: false,
        create_loading: true,
      };
      break;
    case LEADS_CREATE_SUCCESS:
      return {
        ...state,
        create_error_message: false,
        create_loading: false,
      };
      break;
    case LEADS_CREATE_ERROR:
      return {
        ...state,
        create_error_message: action.error_message,
        create_loading: false,
      };
      break;
    default:
      return state || defaultState;
  }
};
