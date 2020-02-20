import React from "react";

import ListAuthors from './ListAuthors';
import axios from "axios";
import utilities from "../utils/Utilities";
import AuthorDetail from "./AuthorDetail";
import {Link} from "react-router-dom";

class Author extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            pagination: {},
            pageNumbers: [],
            author: {},
        };

        this.handleFetchAuthors = this.handleFetchAuthors.bind(this);
        this.handleViewAuthorDetail = this.handleViewAuthorDetail.bind(this);
    }

    componentDidMount() {
        this.fetchAuthors();
    }

    handleFetchAuthors(event, pageNumber) {
        event.preventDefault();
        this.fetchAuthors(pageNumber);
    }

    handleViewAuthorDetail(event, author) {
        event.preventDefault();
        this.fetchAuthorDetail(author);
    }

    /**
     * Fetch authors from database paginated
     */
    fetchAuthors(page = 1) {
        axios.get(utilities.backendUrl + '/authors', {params: {page: page}})
            .then((res) => {
                this.setState({
                    authors: res.data.authors.content,
                    pagination: res.data.authors,
                    pageNumbers: res.data.pageNumbers
                });
            })
            .catch((err) => console.log(err));
    }

    /**
     * Fetch author detail
     */
    fetchAuthorDetail(author) {
        axios.get(`${utilities.backendUrl}/author/${author.id}`)
            .then((res) => this.setState({ author: res.data }))
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="product-collection-area pb-50">
                <div className="container">
                    <div className="section-title text-center mb-55">
                        <h2>Authors</h2>

                        <br />
                        <div>
                            <Link to={'/author/create'} className="btn btn-primary">
                                <i className="ion-ios-plus-empty"></i> Add Author
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <ListAuthors authors={this.state.authors}
                                     pagination={this.state.pagination}
                                     pageNumbers={this.state.pageNumbers}
                                     handleFetchAuthors={this.handleFetchAuthors}
                                     handleViewAuthorDetail={this.handleViewAuthorDetail} />
                        <AuthorDetail author={this.state.author}  />
                    </div>
                </div>
            </div>
        );
    }
}

export default Author;