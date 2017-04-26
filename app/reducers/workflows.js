import {
  WORKFLOWS_FETCH_SUCCESS,
  WORKFLOWS_FETCH_TRY,
  WORKFLOWS_FETCH_ERROR,
} from './../actions/workflowsActions';

const defaultState = {
  workflows: [],
  user_statistics: [],
  error: '',
  loading: true,
};

export default function workflows(state, action) {
  switch (action.type) {
    case WORKFLOWS_FETCH_TRY:
      return {
        ...state,
        error: '',
        loading: true,
      };
      break;
    case WORKFLOWS_FETCH_SUCCESS:
      return {
        ...defaultState,
        workflows: action.workflows,
        user_statistics: action.user_statistics,
        loading: false,
      };
      break;
    case WORKFLOWS_FETCH_ERROR:
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
