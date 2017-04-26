import {
  NOTES_FETCH_SUCCESS,
  NOTES_FETCH_TRY,
  NOTES_FETCH_ERROR,
  NOTES_CREATE_TRY,
  NOTES_CREATE_SUCCESS,
  NOTES_CREATE_ERROR,
} from './../actions/notesActions';

const defaultState = {
  attachments: [],
  notes: [],
  error: '',
  loading: true,
};

export default function notes(state, action) {
  switch (action.type) {

    case NOTES_FETCH_TRY:
      return {
        ...state,
        error: '',
        loading: true,
      };
      break;
    case NOTES_FETCH_SUCCESS:
      return {
        ...defaultState,
        attachments: action.attachments || [],
        notes: action.notes || [],
        loading: false,
      };
      break;
    case NOTES_FETCH_ERROR:
      return {
        ...state,
        error: 'fetch_error',
        loading: false,
      };
      break;
    case NOTES_CREATE_TRY:
      return {
        ...state,
        loading: true,
      };
      break;
    // case NOTES_CREATE_SUCCESS:
    //   return {
    //     ...state,
    //   };
    //   break;
    // case NOTES_CREATE_ERROR:
    //   return {
    //     ...state,
    //     create_error_message: action.error_message,
    //     create_loading: false,
    //   };
    //   break;
    default:
      return state || defaultState;
  }
};
