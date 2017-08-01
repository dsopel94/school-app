import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ShowStudentInfo from '../ShowStudentInfo/ShowStudentInfo';
import Cookies from 'universal-cookie';
import Modal from 'react-modal';
const cookies = new Cookies();

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class CoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: {},
      student: {},
      isClicked: false,
      modalIsOpen: false,
    };
    console.log(this.props.match.params.cuid);
    this.onClick = this.onClick.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onClick(event) {
    console.log(this.state.isClicked);
    this.setState({
      isClicked: !this.state.isClicked,
    });
  }

  handleRedirect(event) {
    this.props.dispatch(actions.setAsAuthenticated());
  }

  handleLogout(event) {
    cookies.remove('instructor');
    cookies.remove('token');
  }

  deleteCourse(event) {
    const id = this.props.match.params.cuid;
    this.props.dispatch(actions.deleteCourse(id));
    this.props.dispatch(actions.setAsAuthenticated());
    console.log('this is working');
  }
  componentDidMount() {
    this.props.dispatch(actions.getCourse(this.props.match.params.cuid));
    this.props.dispatch(actions.getStudents());
  }

  render() {
    let studentList = this.props.student;
    const students = Object.keys(studentList).map(
      student => studentList[student]
    );
    const currentStudents = students.map(student => {
      if (this.props.match.params.cuid == student.courses) {
        return (
          <p>
            <div className="student-info">
              <ShowStudentInfo
                firstName={student.firstName}
                lastName={student.lastName}
                id={student._id}
                phoneNumber={student.phoneNumber}
                courses={student.courses}
                streetAddress={student.streetAddress}
                miscAddress={student.miscAddress}
              />
            </div>
          </p>
        );
      }
    });
    return (
      <div className="course-page">
        <div className="nav-options">
          <div className="course-app-name">School Management App</div>
          <ul>
            <li>
              <Link to="/login" onClick={this.handleLogout}>Log out </Link>
            </li>
            <li>
              <Link to={`/addStudent/${this.props.match.params.cuid}`}>
                Add a new Student
              </Link>
            </li>
            <li>
              <Link to={`/editCourse/${this.props.match.params.cuid}`}>
                Edit Course Name
              </Link>
            </li>
            <li>
              <Link to="#" onClick={this.openModal}>
                Remove this course
              </Link>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className="modal-container">
                  <h2
                    ref={subtitle => this.subtitle = subtitle}
                    className="warning"
                  >
                    Warning
                  </h2>
                  <div className="confirm-msg">
                    Are you sure you want to perform this action?
                  </div>
                  <div className="confirm-buttons">
                    <button onClick={this.deleteCourse} id={this.props.id}>
                      Yes
                    </button>
                    <button onClick={this.closeModal}>No</button>
                  </div>
                </div>
              </Modal>
            </li>
            <li>
              <Link to="/auth/dashboard" onClick={this.handleRedirect}>
                Back to Your Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <h1>{this.props.course.name}</h1>
        <div className="getting-started">
          <p>
            Not sure how to add new students? Simply click on "Add a new Student" above to add students to your account and then click on a student's name to view their contact information.
            {' '}
          </p>
        </div>
        <h2>Your Students</h2>
        <div className="studentList">
          {currentStudents}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    course: state.course.course,
    student: state.student.students,
  };
};

export default connect(mapStateToProps)(CoursePage);
