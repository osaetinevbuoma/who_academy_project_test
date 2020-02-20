import React from "react";
import axios from "axios";
import utilities from "../utils/Utilities";
import {Link} from "react-router-dom";

class EditStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            createdAt: '',
            updatedAt: '',

            notification: {
                message: '',
                alertType: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchStudentDetail();
    }

    handleChange(event) {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            notification: {
                message: '',
                alertType: ''
            }
        });

        const student = {
            id: this.state.id,
            firstName: this.state.firstName.trim(),
            lastName: this.state.lastName.trim(),
            createdAt: this.state.createdAt,
            updatedAt: this.state.updatedAt
        };
        this.updateStudent(student);
    }

    /**
     * Fetch student detail
     */
    fetchStudentDetail() {
        axios.get(`${utilities.backendUrl}/student/${this.props.match.params.id}`)
            .then((res) => {
                this.setState({
                    id: res.data.id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    createdAt: res.data.createdAt,
                    updatedAt: res.data.updatedAt
                });
            })
            .catch((err) => console.log(err));
    }

    /**
     * Update student information
     * @param student
     */
    updateStudent(student) {
        axios.put(`${utilities.backendUrl}/student/${student.id}`, student)
            .then((res) => {
                this.setState({
                    notification: {
                        alertType: 'success',
                        message: 'Student has been updated.'
                    }
                });
            })
            .catch((err) => {
                this.setState({
                    notification: {
                        alertType: 'danger',
                        message: 'Student could not be saved.'
                    }
                });
            });
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

        return (
            <div className="product-collection-area pb-50">
                <div className="container">
                    <div className="section-title text-center mb-55">
                        <h2>Edit Student</h2>
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
                                                <label>First Name</label>
                                                <input type="text" name="firstName" required="required"
                                                       value={this.state.firstName}
                                                       placeholder="E.g. John"
                                                       autoComplete="off" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" name="lastName" required="required"
                                                       value={this.state.lastName}
                                                       placeholder="E.g. Doe"
                                                       autoComplete="off" onChange={this.handleChange} />
                                            </div>
                                            <div className="button-box">
                                                <button type="submit" className="default-btn">
                                                    Save
                                                </button>
                                                &nbsp;
                                                <Link to={'/students'} className="default-btn">
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

export default EditStudent;