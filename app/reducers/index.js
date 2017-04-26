import {combineReducers} from 'redux';
import auth from './auth';
import user from './user';
import leads from './leads';
import workflows from './workflows';
import notes from './notes';
import stages from './stages';
import tasks from './tasks';

export default combineReducers({
  auth,
  user,
  leads,
  workflows,
  notes,
  stages,
  tasks,
});
