import React from "react";

import axios from 'axios';
import lodash from 'lodash';
import utilities from "../utils/Utilities";

class StudentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            course: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.listAllCourses();
    }

    handleChange(event) {
        this.setState({ course: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.course === '') return;

        const course = lodash.find(this.state.courses, { id: parseInt(this.state.course) });
        this.props.handleStudentCourseEnrollment(event, course);
        this.form.reset();
        this.setState({ course: '' });
    }

    /**
     * List all courses for use in drop down menu
     */
    listAllCourses() {
        axios.get(`${utilities.backendUrl}/list-all-courses`)
            .then((res) => this.setState({ courses: res.data }))
            .catch((err) => console.log(err));
    }

    render() {
        const displayCourses = () => {
            if (this.props.student.courses !== undefined && this.props.student.courses.length > 0) {
                return (
                    <ol>
                        {
                            this.props.student.courses.map(course => (<li key={course.id}>{course.name}</li>))
                        }
                    </ol>
                );
            }
        };

        const courseList = () => {
            return (
                <select className="custom-select" value={this.state.course} onChange={this.handleChange}>
                    <option value="">Select Course</option>
                    {
                        this.state.courses.map(course => (<option value={course.id} key={course.id}>
                            {course.name}</option>))
                    }
                </select>
            );
        };

        const showForm = () => {
            if (this.props.student.id !== undefined) {
                return (
                    <div className='col-lg-5'>
                        <h4>Student Details</h4> <br />
                        <p>
                            <strong>First Name</strong>: {this.props.student.firstName}
                        </p>
                        <p>
                            <strong>Last Name</strong>: {this.props.student.lastName}
                        </p>
                        <p><strong>Student's Enrolled Courses: </strong></p>
                        {displayCourses()}

                        <h5>Enroll Student in Course</h5>
                        <form onSubmit={this.handleSubmit} ref={fm => this.form=fm}>
                            <div className="form-group">
                                {courseList()}
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Enroll
                            </button>
                        </form>
                    </div>
                );
            } else {
                return (<div></div>);
            }
        };

        return (showForm());
    }

}

export default StudentDetail;