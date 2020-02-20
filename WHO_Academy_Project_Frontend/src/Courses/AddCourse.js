import React from "react";
import axios from "axios";
import lodash from 'lodash';
import utilities from "../utils/Utilities";
import {Link} from "react-router-dom";

class AddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
            authors: [],

            notification: {
                message: '',
                alertType: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.listAllAuthors();
    }

    handleChange(event) {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSelectChange(event) {
        this.setState({ author: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            notification: {
                message: '',
                alertType: ''
            }
        });

        const author = lodash.find(this.state.authors, { id: parseInt(this.state.author) });
        if (author === undefined) return;

        const course = {
            name: this.state.name.trim(),
            author: author
        };
        this.createCourse(course);
        this.form.reset();
        this.setState({ author: '' });
    }

    /**
     * Create a new course and assign an author.
     */
    createCourse(course) {
        axios.post(utilities.backendUrl + '/course', course)
            .then((res) => {
                this.setState({
                    notification: {
                        alertType: 'success',
                        message: 'Course has been added. Add more courses.'
                    }
                });
            })
            .catch((err) => {
                this.setState({
                    notification: {
                        alertType: 'danger',
                        message: 'Course could not be saved.'
                    }
                });
            });
    }

    /**
     * List all authors for use in dropdown menu
     */
    listAllAuthors() {
        axios.get(`${utilities.backendUrl}/list-all-authors`)
            .then((res) =>  this.setState({ authors: res.data }))
            .catch((err) => console.log(err));
    }

    render() {
        const displayNotification = () => {
            if (this.state.notification.alertType === 'success') {
                return (
                    <div className="alert alert-success">
                        {this.state.notification.message}
                    </div>
                );
            }

            if (this.state.notification.alertType === 'danger') {
                return (
                    <div className="alert alert-danger">
                        {this.state.notification.message}
                    </div>
                );
            }
        };

        const authorList = () => {
            return (
                <select className="custom-select" value={this.state.author}
                        onChange={this.handleSelectChange} required="required">
                    <option value="">Select Author</option>
                    {
                        this.state.authors.map(author => (<option value={author.id} key={author.id}>
                            {author.name}</option>))
                    }
                </select>
            );
        };

        return (
            <div className="product-collection-area pb-50">
                <div className="container">
                    <div className="section-title text-center mb-55">
                        <h2>Add Course</h2>
                    </div>

                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <div className="login">
                                <div className="login-form-container">
                                    <div className="login-form">

                                        {displayNotification()}

                                        <form onSubmit={this.handleSubmit} ref={fm => this.form=fm}>
                                            <div className="form-group">
                                                <label>Course Title</label>
                                                <input type="text" name="name" required="required"
                                                       placeholder="E.g. Humanitarian Development"
                                                       autoComplete="off" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                {authorList()}
                                            </div>
                                            <div className="button-box">
                                                <button type="submit" className="default-btn">
                                                    Save
                                                </button>
                                                &nbsp;
                                                <Link to={'/courses'} className="default-btn">
                                                    Cancel
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>
            </div>
        );
    }

}

export default AddCourse;