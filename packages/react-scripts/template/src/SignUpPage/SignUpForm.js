import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Link } from 'react-router-dom';
import { Route } from 'react-router';
import LoginPage from '../LoginPage/LoginPage';

const SignUpForm = (
  {
    onSubmit,
    onChange,
    errors,
    instructor,
    msg,
  }
) => (
  <form className="pre" action="/" onSubmit={onSubmit}>
    <div className="container">
      <h1 className="header">School Management App</h1>
      <h2 className="sign-up">Sign Up</h2>
      <div className="sign-up-field-line">
        <label htmlFor="fullName">Full Name:</label>
        <input
          id="fullName"
          name="fullName"
          onChange={onChange}
          value={instructor.fullName}
          required
        />
      </div>
      <div className="sign-up-field-line">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          onChange={onChange}
          value={instructor.username}
          required
        />
      </div>
      <div className="sign-up-field-line">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={onChange}
          value={instructor.password}
          required
        />
      </div>
      <div className="signup-button-line">
        <button type="submit" className="sign-up-button">
          Create New Account
        </button>
      </div>

      <div className="login-redirect">
        Already have an account? <Link to={'/login'}> Log in</Link>
        <p>
          Want more info about this app?
          {' '}
          <Link to={'/'}>Click here</Link>
          {' '}
        </p>
      </div>
    </div>
    <Route path="/login" component={LoginPage} />
    <div className="error-msg"><font color="red">{msg}</font></div>
  </form>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  instructor: PropTypes.object.isRequired,
  msg: PropTypes.String,
};

export default SignUpForm;
