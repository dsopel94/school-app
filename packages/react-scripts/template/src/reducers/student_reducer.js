import { GET_STUDENTS, ADD_STUDENT, GET_STUDENT } from '../actions/types';

const INITIAL_STATE = {
  students: {},
  firstName: {},
  lastName: {},
  phoneNumber: {},
  student: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, ...action.payload],
      };
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case GET_STUDENT:
      return {
        ...state,
        student: action.payload,
      };
  }
  return state;
}
