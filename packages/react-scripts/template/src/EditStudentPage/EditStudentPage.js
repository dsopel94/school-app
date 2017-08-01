import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class EditStudentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      student: {
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        phoneNumber: this.props.student.phoneNumber,
        streetAddress: this.props.student.streetAddress,
        miscAddress: this.props.student.miscAddress,
      },
      isSubmitted: false,
    };
    console.log(this.props.firstName, "FIRST NAME")
    this.updateInput = this.updateInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  updateInput(event) {
    const field = event.target.name;
    const student = this.props.student;
    student[field] = event.target.value;
    this.setState({
      student,
    });
  }

  handleLogout(event) {
    cookies.remove('instructor');
    cookies.remove('token');
  }

  componentWillMount() {
    this.props.dispatch(actions.getStudent(this.props.match.params.cuid));
  }

  componentDidMount() {
    this.props.dispatch(actions.getStudent(this.props.match.params.cuid));
  }

  onSubmit(event) {
    event.preventDefault();
    const firstName = this.state.student.firstName;
    const lastName = this.state.student.lastName;
    const phoneNumber = this.state.student.phoneNumber;
    const streetAddress = this.state.student.streetAddress;
    const miscAddress = this.state.student.miscAddreess;
    const id = this.props.match.params.cuid;
    this.props.dispatch(actions.getStudent(id));

    window.location.href = `http://localhost:3000/courses/${this.props.studentCourse}`;
    this.setState({
      isSubmitted: true,
    });
    this.props.dispatch(
      actions.editStudent(
        firstName,
        lastName,
        phoneNumber,
        streetAddress,
        miscAddress,
        id
      )
    );
  }
  render() {
    if (this.state.isSubmitted) {
      //return <Redirect to={`/courses/${this.props.match.params.cuid}`} />
    }
    return (
      <form action="/" onSubmit={this.onSubmit}>
        <div className="student-name">
          <div className="app-name">School Management System</div>
          <div className="edit-student-nav-options">
            <ul>
              <li>
                <Link to={`/courses/${this.props.studentCourse}`}>
                  Back to Your Course
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={this.handleLogout}>Log out </Link>
              </li>
            </ul>
          </div>
          <h2>{this.props.firstName} {this.props.lastName}</h2>
        </div>
        <div className="container">
          <div className="submitForm">
            <div className="edit-student-field-line">
              <label htmlFor="firstName">First Name:</label>
              <input
                id="firstName"
                name="firstName"
                value={this.props.student.firstName}
                onChange={this.updateInput}
              />
            </div>
            <div className="edit-student-field-line">
              <label htmlFor="lastName">Last Name:</label>
              <input
                id="lastName"
                name="lastName"
                value={this.props.student.lastName}
                onChange={this.updateInput}
              />
            </div>
            <div className="edit-student-field-line">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={this.props.student.phoneNumber}
                onChange={this.updateInput}
              />
            </div>
            <div className="edit-student-field-line">
              <label htmlFor="streetAddress">Street Address:</label>
              <input
                id="streetAddress"
                name="streetAddress"
                value={this.props.student.streetAddress}
                onChange={this.updateInput}
              />
            </div>
            <div className="edit-student-field-line">
              <label htmlFor="miscAddress">City, State, Zip:</label>
              <input
                id="miscAddress"
                name="miscAddress"
                value={this.props.student.miscAddress}
                onChange={this.updateInput}
              />
            </div>
            <button type="submit" className="edit-student">Edit Student</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    firstName: state.student.student.firstName,
    lastName: state.student.student.lastName,
    phoneNumber: state.student.student.phoneNumber,
    miscAddress: state.student.student.miscAddress,
    streetAddress: state.student.student.streetAddress,
    courses: state.student.courses,
    studentCourse: state.student.student.courses,
    student: state.student.student
  };
};
export default connect(mapStateToProps)(EditStudentPage);
