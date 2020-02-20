import React from "react";
import {Link} from "react-router-dom";

class ListAuthors extends React.Component {
    render() {
        const pagination = () => {
            if (this.props.pagination !== {} && this.props.pagination.totalPages > 0) {
                return (
                    <nav aria-label='Page navigation'>
                        <ul className='pagination justify-content-center'>
                            <li className={this.props.pagination.number + 1 === 1 ? 'page-item disabled'
                                : 'page-item'}>
                                <a className='page-link' aria-label='Previous' href={'#'}
                                   onClick={(event) =>
                                       this.props.handleFetchAuthors(event, this.props.pagination.number)}>
                                    <span aria-hidden='true'>
                                        Previous
                                    </span>
                                </a>
                            </li>

                            {this.props.pageNumbers.map((pageNumber, index) => {
                                return (
                                    <li className={pageNumber === this.props.pagination.number + 1 ?
                                        'page-item active' : 'page-item'} key={index}>
                                        <a className='page-link' href={'#'}
                                           onClick={(event) =>
                                               this.props.handleFetchAuthors(event, pageNumber)}>
                                            {pageNumber}
                                        </a>
                                    </li>
                                );
                            })}

                            <li className={this.props.pagination.number + 1 === this.props.pagination.totalPages
                                ? 'page-item disabled' : 'page-item'}>
                                <a className='page-link' aria-label='Next' href={'#'}
                                   onClick={(event) =>
                                       this.props.handleFetchAuthors(event, this.props.pagination.number + 2)}>
                                    <span aria-hidden='true'>
                                        Next
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                );
            }
        };

        const listTable = () => {
            if (this.props.authors.length > 0) {
                return (
                    <div className="col-lg-7">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Details</th>
                                <th>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.authors.map((author) => {
                                    return (
                                        <tr key={author.id}>
                                            <td>{author.name}</td>
                                            <td>
                                                <a href={'#'} title="View Detail"
                                                   onClick={(event) => this.props.handleViewAuthorDetail(event, author)}>
                                                    <i className="ion-android-folder-open"></i>
                                                </a>
                                            </td>
                                            <td>
                                                <Link to={`/author/edit/${author.id}`} title="Edit Author">
                                                    <i className="ion-edit"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>

                        {pagination()}
                    </div>
                );
            } else {
                return (<div></div>);
            }
        };

        return (listTable());
    }

}

export default ListAuthors;