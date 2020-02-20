import React from "react";
import ListStudents from "./ListStudents";
import StudentDetail from "./StudentDetail";
import {Link} from "react-router-dom";
import axios from "axios";
import lodash from 'lodash';
import utilities from "../utils/Utilities";

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            pagination: {},
            pageNumbers: [],
            student: {},
        };

        this.handleFetchStudents = this.handleFetchStudents.bind(this);
        this.handleViewStudentDetail = this.handleViewStudentDetail.bind(this);
        this.handleStudentCourseEnrollment = this.handleStudentCourseEnrollment.bind(this);
    }

    componentDidMount() {
        this.fetchStudents();
    }

    handleFetchStudents(event, pageNumber) {
        event.preventDefault();
        this.fetchStudents(pageNumber);
    }

    handleViewStudentDetail(event, author) {
        event.preventDefault();
        this.fetchStudentDetail(author);
    }

    handleStudentCourseEnrollment(event, course) {
        event.preventDefault();
        this.enrollStudentInCourse(course);
    }

    /**
     * Fetch students from database paginated
     */
    fetchStudents(page = 1) {
        axios.get(`${utilities.backendUrl}/students`, {params: {page: page}})
            .then((res) => {
                this.setState({
                    students: res.data.students.content,
                    pagination: res.data.students,
                    pageNumbers: res.data.pageNumbers
                });
            })
            .catch((err) => console.log(err));
    }

    /**
     * Fetch student detail
     */
    fetchStudentDetail(student) {
        axios.get(`${utilities.backendUrl}/student/${student.id}`)
            .then((res) => this.setState({ student: res.data }))
            .catch((err) => console.log(err));
    }

    /**
     * Enroll student in select course.
     * @param course
     */
    enrollStudentInCourse(course) {
        if (lodash.find(this.state.student.courses, { id: course.id }) !== undefined) {
            return;
        }

        let student = this.state.student;
        student.courses.push(course);

        axios.put(`${utilities.backendUrl}/enroll/${course.id}/${this.state.student.id}`,
            student)
            .then((res) => this.fetchStudentDetail(this.state.student))
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="product-collection-area pb-50">
                <div className="container">
                    <div className="section-title text-center mb-55">
                        <h2>Students</h2>

                        <br />
                        <div>
                            <Link to={'/student/create'} className="btn btn-primary">
                                <i className="ion-ios-plus-empty"></i> Add Student
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <ListStudents students={this.state.students}
                                     pagination={this.state.pagination}
                                     pageNumbers={this.state.pageNumbers}
                                     handleFetchStudents={this.handleFetchStudents}
                                     handleViewStudentDetail={this.handleViewStudentDetail} />
                        <StudentDetail student={this.state.student}
                                       handleStudentCourseEnrollment={this.handleStudentCourseEnrollment}  />
                    </div>
                </div>
            </div>
        );
    }

}


export default Student;