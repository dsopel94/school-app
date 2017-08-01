import { ADD_COURSE, GET_COURSES, GET_COURSE } from '../actions/types';

const INITIAL_STATE = {
  coursename: [],
  _creator: {},
  courses: {},
  course: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_COURSE:
      return {
        ...state,
        coursename: [...state.coursename, action.coursename],
        _creator: action._creator,
      };
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_COURSE:
      return {
        ...state,
        course: action.payload,
      };
  }
  return state;
}
