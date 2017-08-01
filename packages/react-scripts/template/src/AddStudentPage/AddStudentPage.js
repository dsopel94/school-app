import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class AddStudentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      student: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        streetAddress: '',
        miscAddress: '',
      },
      isSubmitted: false,
    };
    this.updateInput = this.updateInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleLogout = this.onSubmit.bind(this);
  }
  updateInput(event) {
    const field = event.target.name;
    const student = this.state.student;
    student[field] = event.target.value;
    this.setState({
      student,
    });
  }
  onSubmit(event) {
    event.preventDefault();
    const firstName = this.state.student.firstName;
    const lastName = this.state.student.lastName;
    const phoneNumber = this.state.student.phoneNumber;
    const streetAddress = this.state.student.streetAddress;
    const miscAddress = this.state.student.miscAddress;
    const courses = this.props.match.params.cuid;
    window.location.href = `http://localhost:3000/courses/${courses}`;
    this.setState({
      isSubmitted: true,
    });
    this.props.dispatch(
      actions.addStudent(
        firstName,
        lastName,
        phoneNumber,
        streetAddress,
        miscAddress,
        courses
      )
    );
  }

  handleLogout() {
    cookies.remove('instructor');
    cookies.remove('token');
  }
  render() {
    if (this.state.isSubmitted) {
      return <Redirect to={`/courses/${this.props.match.params.cuid}`} />;
    }
    return (
      <form action="/" onSubmit={this.onSubmit}>
        <div className="student-app-name">School Management App</div>
        <div className="add-student-nav-options">
          <ul>
            <li>
              <Link to={`/courses/${this.props.match.params.cuid}`}>
                Back to Your Course Page
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={this.handleLogout}>Log out </Link>
            </li>
          </ul>
        </div>
        <div className="container">
          <div className="submitForm">
            <div className="add-student-field-line">
              <label htmlFor="firstName">First Name:</label>
              <input
                id="firstName"
                name="firstName"
                value={this.state.firstName}
                onChange={this.updateInput}
              />
            </div>
            <div className="add-student-field-line">
              <label htmlFor="lastName">Last Name:</label>
              <input
                id="lastName"
                name="lastName"
                value={this.state.lastName}
                onChange={this.updateInput}
              />
            </div>
            <div className="add-student-field-line">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.updateInput}
              />
            </div>
            <div className="add-student-field-line">
              <label htmlFor="streetAddress">Street Address:</label>
              <input
                id="streetAddress"
                name="streetAddress"
                value={this.state.streetAddress}
                onChange={this.updateInput}
              />
            </div>
            <div className="add-student-field-line">
              <label htmlFor="miscAddress">City, State, Zip:</label>
              <input
                id="miscAddress"
                name="miscAddress"
                value={this.state.miscAddress}
                onChange={this.updateInput}
              />
            </div>
            <button type="submit" className="add-student">Add Student</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    firstName: state.student.firstName,
    lastName: state.student.lastName,
    phoneNumber: state.student.phoneNumber,
    courses: state.student.courses,
  };
};
export default connect(mapStateToProps)(AddStudentPage);
