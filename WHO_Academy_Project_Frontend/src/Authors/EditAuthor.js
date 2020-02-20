import React from "react";
import axios from "axios";
import utilities from "../utils/Utilities";
import {Link} from "react-router-dom";

class EditAuthor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
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
        this.fetchAuthorDetail();
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

        const author = {
            id: this.state.id,
            name: this.state.name.trim(),
            createdAt: this.state.createdAt,
            updatedAt: this.state.updatedAt
        };
        this.updateAuthor(author);
    }

    /**
     * Fetch author detail
     */
    fetchAuthorDetail() {
        axios.get(`${utilities.backendUrl}/author/${this.props.match.params.id}`)
            .then((res) => {
                this.setState({
                    id: res.data.id,
                    name: res.data.name,
                    createdAt: res.data.createdAt,
                    updatedAt: res.data.updatedAt
                });
            })
            .catch((err) => console.log(err));
    }

    /**
     * Update author information
     * @param author
     */
    updateAuthor(author) {
        axios.put(utilities.backendUrl + '/author/' + author.id, author)
            .then((res) => {
                this.setState({
                    notification: {
                        alertType: 'success',
                        message: 'Author has been updated.'
                    }
                });
            })
            .catch((err) => {
                this.setState({
                    notification: {
                        alertType: 'danger',
                        message: 'Author could not be saved.'
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
                        <h2>Edit Author</h2>
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
                                                <label>Author's Full Name</label>
                                                <input type="text" name="name" required="required"
                                                       value={this.state.name}
                                                       placeholder="E.g. John Doe"
                                                       autoComplete="off" onChange={this.handleChange} />
                                            </div>
                                            <div className="button-box">
                                                <button type="submit" className="default-btn">
                                                    Save
                                                </button>
                                                &nbsp;
                                                <Link to={'/authors'} className="default-btn">
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

export default EditAuthor;