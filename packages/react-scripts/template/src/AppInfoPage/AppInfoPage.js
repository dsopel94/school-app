import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class AppInfoPage extends React.Component {
  constuctor(props, context) {}
  super(props, context) {}
  render() {
    return (
      <div className="info pre">
        <h1>About Me and This Application</h1>
      <div className="main-info">
        <p>
          Hi! My name is Damian Sopel and I am an aspiring 23 year old web developer.
          I graduated from UW-Madison in 2015 with a degree in Statistics.
          However after graduation, I didn't see Statistics as a good fit for me long term
          so I enrolled in Thinkful's flexible web development bootcamp to prepare me for my
          transition into becoming a prospective web developer.{' '}
        </p>

        <p>
          Enough about me and let's get into the meat and bones of this application!
          This application allows instructors to organize their information by adding
          courses and within those courses adding students and their contact information.
          You are able to add and delete students and course information as well.
          {' '}
        </p>

        <p>
          The front end portion of this application was built using React and the back end
          was built using Mongoose, Express, and Node. mLab was also used for storage of the
          instructor's data and Passport.js is used for authentication purposes.
        </p>
      </div>  
        <div className="return-link">
          <Link to="/signup">Click here to head to the signup page.</Link>
        </div>
      </div>
    );
  }
}

export default AppInfoPage;
