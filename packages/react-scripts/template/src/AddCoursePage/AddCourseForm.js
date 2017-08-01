import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class AddCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      submitted: false,
      _creator: {},
    };
    this.updateName = this.updateName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  updateName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleLogout(event) {
    cookies.remove('instructor');
    cookies.remove('token');
  }
  onSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const instructor = cookies.get('instructor')._id;
    console.log(cookies.get('instructor')._id);
    this.setState({
      submitted: true,
    });
    this.props.dispatch(actions.addCourse(name, instructor));
    console.log(this.props.name);
    console.log(name, cookies.get('instructor')._id);
  }

  render() {
    if (this.state.submitted) {
      return <Redirect to="/auth/dashboard" />;
    }
    return (
      <form action="/" onSubmit={this.onSubmit}>
        <div className="add-course-nav-options">
          <div className="student-app-name">School Management App</div>
          <ul>
            <li>
              <Link to="/login" onClick={this.handleLogout}>Log out </Link>
            </li>
            <li><Link to="/auth/dashboard">Back to Your Dashboard</Link></li>
          </ul>
        </div>
        <div className="add-course-header">
          <h1>Add a Course</h1>
        </div>
        <div className="add-course-container">
          <div className="add-coursename-field-line">
            <label htmlFor="coursename">Course Name:</label>
            <input
              id="coursename"
              name="coursename"
              value={this.state.name}
              onChange={this.updateName}
            />
          </div>
          <button type="submit" className="add-course">Add Course</button>
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    name: state.course.coursename,
    _creator: state.course._creator,
  };
};
export default connect(mapStateToProps)(AddCoursePage);
