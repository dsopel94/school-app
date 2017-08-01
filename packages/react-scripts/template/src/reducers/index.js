import { combineReducers } from 'redux';
import registerReducer from './register_reducer';
import authReducer from './auth_reducer';
import courseReducer from './course_reducer';
import studentReducer from './student_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  course: courseReducer,
  student: studentReducer,
});

export default rootReducer;
