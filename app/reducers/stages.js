import {
  STAGES_FETCH_TRY,
  STAGES_FETCH_SUCCESS,
  STAGES_FETCH_ERROR,
} from './../actions/stagesActions';

const defaultState = {
  stages: {},
  error: '',
  loading: true,
};

export default function stages(state, action) {
  switch (action.type) {

    case STAGES_FETCH_TRY:
      return {
        ...state,
        error: '',
        loading: true,
      };
      break;
    case STAGES_FETCH_SUCCESS:
      return {
        stages: action.stages,
        error: '',
        loading: false,
      };
      break;
    case STAGES_FETCH_ERROR:
      return {
        ...state,
        error: action.errors,
        loading: false,
      };
      break;
    default:
      return state || defaultState;
  }
};
