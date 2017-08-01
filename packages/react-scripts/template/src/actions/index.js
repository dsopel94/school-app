import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  PROTECTED_TEST,
  ADD_COURSE,
  GET_COURSES,
  GET_COURSE,
  ADD_STUDENT,
  GET_STUDENTS,
  GET_STUDENT,
  SET_AUTHENTICATED,
} from './types';

import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const API_URL = 'http://localhost:3001/api';

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if (error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please try again.',
    });
  } else {
    dispatch({
      type: type,
      payload: errorMessage,
    });
  }
}

export function getCourse(cuid) {
  return function(dispatch) {
    axios.get(`http://localhost:3001/courses/${cuid}`).then(response => {
      dispatch({
        type: GET_COURSE,
        payload: response.data.course,
      });
    });
  };
}

export function getCourses() {
  return function(dispatch) {
    axios.get('http://localhost:3001/courses').then(response => {
      dispatch({
        type: GET_COURSES,
        payload: response.data.courses,
      });
    });
  };
}

export function setAsAuthenticated() {
  return function(dispatch) {
    dispatch({
      type: SET_AUTHENTICATED,
      authenticated: true,
    });
  };
}

export function getStudents() {
  return function(dispatch) {
    axios.get('http://localhost:3001/students').then(response => {
      dispatch({
        type: GET_STUDENTS,
        payload: response.data.students,
      });
    });
  };
}

export function getStudent(id) {
  return function(dispatch) {
    axios.get(`http://localhost:3001/students/${id}`).then(response => {
      console.log(response.data, "What's going on here?");
      dispatch({
        type: GET_STUDENT,
        payload: response.data.student,
      });
    });
  };
}

export function deleteStudent(id) {
  return function(dispatch) {
    axios.delete(`http://localhost:3001/students/${id}`).then(response => {});
  };
}

export function deleteCourse(id) {
  return function(dispatch) {
    axios.delete(`http://localhost:3001/courses/${id}`).then(response => {
      window.location.href = 'http://localhost:3000/auth/dashboard';
      dispatch({
        type: GET_COURSES,
        payload: response.data.courses,
      });
    });
  };
}

export function addPeriod(number) {
  return function(dispatch) {
    axios.post('http://localhost:3001/periods').then(response => {
      dispatch({
        type: ADD_COURSE,
        payload: response.data.periods,
      });
    });
  };
}

export function editCourse(coursename, id) {
  return function(dispatch) {
    axios
      .put(`http://localhost:3001/courses/${id}`, {
        name: coursename,
      })
      .then(response => {
        console.log(response.data.courses);
        window.location.href = `http://localhost:3000/courses/${response.data.courses._id}`;
      });
  };
}

export const registerUser = (
  username,
  fullName,
  password,
  redirect = '/login'
) => {
  return function(dispatch) {
    console.log('This is getting called!');
    axios
      .post('http://localhost:3001/api/auth/register', {
        username: username,
        fullName: fullName,
        password: password,
      })
      .then(res => {
        // cookie.save('token', res.data.token, { path: '/' });
        window.location.href = 'http://localhost:3000/login';
        // dispatch({ type: REGISTER_USER_SUCCESS });
      })
      .catch(error => {
        window.location.href = '/?msg=This%20username%20already%20exists';
        // errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
};

export const addStudent = (
  firstName,
  lastName,
  phoneNumber,
  streetAddress,
  miscAddress,
  courses
) => {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/students`, {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        courses: courses,
        streetAddress: streetAddress,
        miscAddress: miscAddress,
      })
      .then(response => {
        dispatch({
          type: ADD_STUDENT,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          courses: courses,
          streetAddress: streetAddress,
          miscAddress: miscAddress,
        });
        window.location.href = `http://localhost:3000/courses/${courses}`;
        console.log(window.location.href);
        console.log(response.data.students, 'Student response');
      });
  };
};

export const editStudent = (
  firstName,
  lastName,
  phoneNumber,
  streetAddress,
  miscAddress,
  id
) => {
  return function(dispatch) {
    axios
      .put(`http://localhost:3001/students/${id}`, {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        streetAddress: streetAddress,
        miscAddress: miscAddress,
      })
      .then(response => {
        console.log(response.data.students, 'Checking after put');
        window.location.href = `http://localhost:3000/courses/${response.data.students.courses}`;
      });
  };
};

export const loginUser = (username, password) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
      username: username,
      password: password,
    });
    axios
      .post(`${API_URL}/auth/login`, { username, password })
      .then(response => {
        cookies.set('token', response.data.token, { path: '/', maxAge: 86400 });
        cookies.set('instructor', response.data.instructor, {
          path: '/',
          maxAge: 86400,
        });
        console.log(cookies.get('instructor'));
        dispatch({
          type: LOGIN_USER_SUCCESS,
          fullName: response.data.instructor.fullName,
        });
        //window.location.href = 'http://localhost:3000/auth/dashboard'
      })
      .catch(error => {
        //window.location.href = '/?msg=Not%20a%20valid%20username%20or%20password%20combination';
        dispatch({
          type: LOGIN_USER_FAILURE,
          error: 'Not a valid username/password combination',
        });
      });
  };
};
//http://localhost:3001/courses
export const addCourse = (name, instructor) => {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/courses`, {
        name: name,
        _creator: instructor,
        periods: [],
      })
      .then(response => {
        cookies.get('instructor');
        dispatch({
          type: ADD_COURSE,
          coursename: name,
          _creator: cookies.get('instructor')._id,
          periods: [],
        });
        window.location.href = 'http://localhost:3000/auth/dashboard';
      });
  };
};
// export function protectedTest() {
//   return function(dispatch) {
//     axios
//       .get(`${API_URL}/protected`, {
//         headers: { Authorization: cookie.load('token') },
//       })
//       .then(response => {
//         dispatch({
//           type: PROTECTED_TEST,
//           payload: response.data.content,
//         });
//       })
//       .catch(error => {
//         errorHandler(dispatch, error.response, AUTH_ERROR);
//       });
//   };
// }
//  export default function actions;
// export function logoutUser() {
//   return function (dispatch) {
//     dispatch({ type: UNAUTH_USER });
//     cookie.remove('token', { path: '/' });
//
//     window.location.href = CLIENT_ROOT_URL + '/login';
//   }
// }
//
// export function protectedTest() {
//   return function(dispatch) {
//     axios.get(`${API_URL}/protected`, {
//       headers: { 'Authorization': cookie.load('token') }
//     })
//     .then(response => {
//       dispatch({
//         type: PROTECTED_TEST,
//         payload: response.data.content
//       });
//     })
//     .catch((error) => {
//       errorHandler(dispatch, error.response, AUTH_ERROR)
//     });
//   }
// }
