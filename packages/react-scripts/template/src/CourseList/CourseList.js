import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class CourseList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      courses: [],
      isClicked: false,
      coursename: '',
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.setState({
      isClicked: true,
      coursename: event.target.id,
    });
    console.log(event.target.id);
  }

  render() {
    let courses = this.props.courses;
    let coursenames = courses.map(coursename => {
      return (
        <p>
          <button className="courses" id={coursename} onClick={this.onClick}>
            {coursename}
          </button>
        </p>
      );
    });
    if (this.state.isClicked == true) {
      return <Redirect to={`/courses/${this.state.coursename}`} />;
    }
    return (
      <div className="courseButtons">
        {coursenames}
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    courses: state.course.coursename,
  };
};
export default connect(mapStateToProps)(CourseList);
