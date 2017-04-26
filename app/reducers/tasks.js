import {
  TASKS_FETCH_SUCCESS,
  TASKS_FETCH_TRY,
  TASKS_FETCH_ERROR,
  TASKS_CREATE_TRY,
  TASKS_CREATE_SUCCESS,
  TASKS_CREATE_ERROR,
  TASKS_UPDATE_TRY,
} from './../actions/tasksActions';

const defaultState = {
  tasks: [],
  error: '',
  loading: true,
};

export default function tasks(state, action) {
  switch (action.type) {

    case TASKS_FETCH_TRY:
      return {
        ...state,
        loading: true,
      };
      break;
    case TASKS_UPDATE_TRY:

      let tasks = state.tasks;

      tasks.map(task => {
        if (task.id.toString() === action.task_id.toString()) {
          task.completed = action.completed;
        }
        return task;
      });

      return {
        ...state,
        loading: true,
      };
      break;
    case TASKS_FETCH_SUCCESS:
      return {
        tasks: action.tasks,
        error: '',
        loading: false,
      };
      break;
    case TASKS_FETCH_ERROR:
      return {
        ...state,
        error: 'fetch_error',
        loading: false,
      };
      break;
    case TASKS_CREATE_TRY:
      return {
        ...state,
        loading: true,
      };
      break;
    case TASKS_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
      break;
    case TASKS_CREATE_ERROR:
      return {
        ...state,
        error: action.error_message,
        loading: false,
      };
      break;
    default:
      return state || defaultState;
  }
};
