import React from 'react';

class AuthorDetail extends React.Component {
    render() {
        const displayCourses = () => {
            if (this.props.author.courses !== undefined && this.props.author.courses.length > 0) {
                return (
                    <ol>
                        {
                            this.props.author.courses.map(course => (<li key={course.id}>{course.name}</li>))
                        }
                    </ol>
                );
            }
        };

        const showForm = () => {
            if (this.props.author.id !== undefined) {
                return (
                    <div className='col-lg-5'>
                        <h4>Author Detail</h4> <br />
                        <p>
                            <strong>Full Name</strong>: {this.props.author.name}
                        </p>
                        <p><strong>Author's Courses: </strong></p>
                        {displayCourses()}
                    </div>
                );
            } else {
                return (<div></div>);
            }
        };

        return (showForm());
    }

}

export default AuthorDetail;