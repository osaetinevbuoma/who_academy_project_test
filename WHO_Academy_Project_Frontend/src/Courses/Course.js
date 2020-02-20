import React from "react";
import axios from "axios";
import utilities from "../utils/Utilities";
import {Link} from "react-router-dom";
import CourseDetail from "./CourseDetail";
import ListCourses from "./ListCourses";

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            pagination: {},
            pageNumbers: [],
            course: {},
        };

        this.handleFetchCourses = this.handleFetchCourses.bind(this);
        this.handleViewCourseDetail = this.handleViewCourseDetail.bind(this);
    }

    componentDidMount() {
        this.fetchCourses();
    }

    handleFetchCourses(event, pageNumber) {
        event.preventDefault();
        this.fetchCourses(pageNumber);
    }

    handleViewCourseDetail(event, course) {
        event.preventDefault();
        this.fetchCourseDetail(course);
    }

    /**
     * Fetch courses from database paginated
     */
    fetchCourses(page = 1) {
        axios.get(`${utilities.backendUrl}/courses`, {params: {page: page}})
            .then((res) => {
                this.setState({
                    courses: res.data.courses.content,
                    pagination: res.data.courses,
                    pageNumbers: res.data.pageNumbers
                });
            })
            .catch((err) => console.log(err));
    }

    /**
     * Fetch course detail
     */
    fetchCourseDetail(course) {
        axios.get(`${utilities.backendUrl}/course/${course.id}`)
            .then((res) => this.setState({ course: res.data }))
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="product-collection-area pb-50">
                <div className="container">
                    <div className="section-title text-center mb-55">
                        <h2>Courses</h2>

                        <br />
                        <div>
                            <Link to={'/course/create'} className="btn btn-primary">
                                <i className="ion-ios-plus-empty"></i> Add Course
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <ListCourses courses={this.state.courses}
                                      pagination={this.state.pagination}
                                      pageNumbers={this.state.pageNumbers}
                                      handleFetchCourses={this.handleFetchCourses}
                                      handleViewCourseDetail={this.handleViewCourseDetail} />
                        <CourseDetail course={this.state.course}  />
                    </div>
                </div>
            </div>
        );
    }
}

export default Course;