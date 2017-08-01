import React, { PropTypes } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';

class LoginPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      instructor: {
        username: '',
        password: '',
        authenticated: true,
        errorMessage: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const username = this.state.instructor.username;
    const password = this.state.instructor.password;
    console.log(this.props.authenticated);
    this.props.dispatch(actions.loginUser(username, password));
    if (!this.state.authenticated) {
      this.setState({
        errorMessage: 'Not a valid username/password combination',
      });
      console.log(this.state.errorMessage);
    }
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const instructor = this.state.instructor;
    instructor[field] = event.target.value;

    this.setState({
      instructor,
    });
  }

  /**
   * Render the component.
   */
  render() {
    console.log(this.props.error);
    if (this.props.authenticated === true) {
      return <Redirect to="/auth/dashboard" />;
    }
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        instructor={this.state.instructor}
        error={this.props.error}
        msg={this.props.error}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    username: state.auth.username,
    password: state.auth.password,
    authenticated: state.auth.authenticated,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps)(LoginPage);
