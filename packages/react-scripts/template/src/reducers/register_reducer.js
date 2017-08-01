import { REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from '../actions/types';

const INITIAL_STATE = {
  error: '',
  message: '',
  username: '',
  fullName: '',
  password: '',
  isRegistering: false,
  isRegistered: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        isRegistered: true,
        message: 'You have successfuly registered',
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        isRegistering: false,
        isRegistered: false,
        error: action.payload,
      };
  }

  return state;
}
