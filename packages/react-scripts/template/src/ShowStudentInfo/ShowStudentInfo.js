import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

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

class ShowStudentInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      student: {
        modalIsOpen: false,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        id: '',
      },
      isClickedEdit: false,
      isClickedDelete: false,
      isClicked: false,
      clickedStudentId: '',
    };
    this.isClickedEdit = this.isClickedEdit.bind(this);
    this.isClickedDelete = this.isClickedDelete.bind(this);
    this.isClicked = this.isClicked.bind(this);
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

  isClickedEdit(event) {
    event.preventDefault();
    this.setState({
      isClickedEdit: !this.state.isClickedEdit,
    });
    window.location.href = `http://localhost:3000/editStudent/${this.props.id}`;
  }

  isClickedDelete(event) {
    event.preventDefault();
    this.setState({
      isClickedDelete: !this.state.isClickedDelete,
    });
    this.props.dispatch(actions.deleteStudent(event.target.id));
    console.log(event.target.id, 'Check target id');
    window.location.href = `http://localhost:3000/courses/${this.props.courses}`;
    console.log('this is deleting');
  }

  isClicked(event) {
    event.preventDefault();
    var ele = document.querySelectorAll('.student-info-box');
    console.log('ele', ele.style, ele);
    if (typeof ele[0] !== 'undefined') {
      ele[0].style.display = 'none';
    }

    this.setState({
      isClicked: !this.state.isClicked,
    });
  }
  render() {
    return (
      <div className="student-info-container">
        <div className="student-button">
          <button
            className="students"
            onClick={this.isClicked}
            courses={this.props.courses}
            id={this.props.id}
          >
            {this.props.firstName} {this.props.lastName}
          </button>
        </div>
        {this.state.isClicked &&
          <div className="student-info">
            <div className="student-info-box">
              <p>Name: {this.props.firstName} {this.props.lastName}</p>
              <p>Phone Number: {this.props.phoneNumber}</p>
              <p>Street Address: {this.props.streetAddress} </p>
              <p> Street Address Line 2: {this.props.miscAddress} </p>
              <div className="student-buttons">
                <button
                  className="edit-student"
                  id={this.props.id}
                  onClick={this.isClickedEdit}
                >
                  Edit Student Info
                </button>
                <button
                  className="delete-student"
                  id={this.props.id}
                  onClick={this.openModal}
                >
                  Delete Student
                </button>
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
                      <button onClick={this.isClickedDelete} id={this.props.id}>
                        Yes
                      </button>
                      <button onClick={this.closeModal}>No</button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>}
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

export default connect(mapStateToProps)(ShowStudentInfo);
