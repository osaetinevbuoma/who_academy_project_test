import React from "react";

import lodash from 'lodash';

class CourseDetail extends React.Component {
    render() {
        const displayAuthorsOtherCourses = () => {
            if (this.props.course.author.courses !== undefined &&
                this.props.course.author.courses.length > 0) {
                const courses = lodash.filter(this.props.course.author.courses, course => course.id
                    !== this.props.course.id);
                return (
                    <ol>
                        {
                            courses.map(course => (<li key={course.id}>{course.name}</li>))
                        }
                    </ol>
                );
            }
        };

        const showForm = () => {
            if (this.props.course.id !== undefined) {
                return (
                    <div className='col-lg-5'>
                        <h4>Course Details</h4> <br />
                        <p>
                            <strong>Title</strong>: {this.props.course.name}
                        </p>

                        <h5>Author's Information: </h5>
                        <p><strong>Name</strong>: {this.props.course.author.name}</p>

                        <h5>Other Courses by Author</h5>
                        {displayAuthorsOtherCourses()}
                    </div>
                );
            } else {
                return (<div></div>);
            }
        };

        return (showForm());
    }

}

export default CourseDetail;