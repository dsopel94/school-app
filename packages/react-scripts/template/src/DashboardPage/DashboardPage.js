import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import CourseList from '../CourseList/CourseList.js';
import axios from 'axios';
import { Redirect } from 'react-router';
//import router from '../server/controllers/course.controller.js'
const cookies = new Cookies();

class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      courses: {},
      authenticated: true,
    };
    this.onClick = this.onClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    window.location = '/courses/' + event.target.id;
  }

  handleLogout(event) {
    //cookies.remove('instructor');
    cookies.remove('token');
    this.setState({
      authenticated: false,
    });
    window.location.href = `http://localhost:3000/login`;
  }

  componentDidMount() {
    this.props.dispatch(actions.getCourses());
    // axios.get('http://localhost:3001/courses').then(response => {
    //   const courses = response.data.courses;
    //   const userIds = Object.keys(courses).map(
    //     course => courses[course]._creator
    //   );
    //   this.setState({
    //     courses: response.data.courses,
    //   });
    // });
  }
  render() {
    if (!this.state.authenticated) {
      window.location.href = `http://localhost:3000/login`;
    }
    console.log(this.state.authenticated, 'that the user is authenticated');
    let inst = cookies.get('instructor').fullName;
    let courseList = this.props.courses;
    let courses = Object.keys(courseList).map(course => courseList[course]);
    const courseButtons = courses.map(course => {
      if (cookies.get('instructor')._id == course._creator) {
        return (
          <p>
            <button className="courses" onClick={this.onClick} id={course._id}>
              {course.name}
            </button>
          </p>
        );
      }
    });
    return (
      <div>
        <div className="dashboard-links">
          <div className="student-app-name">School Management App</div>
          <ul>
            <li>
              <Link to="/login" onClick={this.handleLogout}>Log out </Link>
            </li>
            <li><Link to="/addCourse">Add a new course </Link></li>
          </ul>
        </div>
        <div className="greeting"> Welcome Back, {inst}</div>
        <div className="getting-started">
          <p>
            Need help getting started? It's as simple as clicking on "Add a new Course" above and your courses can be accessed by clicking on the desired one below!
          </p>
        </div>
        <div className="dashboard-your-courses"><h2>Your Courses</h2></div>
        <div className="courseList">{courseButtons}</div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    fullName: state.auth.fullName,
    authenticated: state.auth.authenticated,
    coursename: state.course.coursename,
    courses: state.course.courses,
  };
};

export default connect(mapStateToProps)(DashboardPage);
