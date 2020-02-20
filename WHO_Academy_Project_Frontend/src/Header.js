import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import Author from "./Authors/Author";
import Student from "./Students/Student";
import Course from "./Courses/Course";
import AddAuthor from "./Authors/AddAuthor";
import EditAuthor from "./Authors/EditAuthor";
import AddStudent from "./Students/AddStudent";
import EditStudent from "./Students/EditStudent";
import AddCourse from "./Courses/AddCourse";
import EditCourse from "./Courses/EditCourse";

class Header extends React.Component {
    render() {
        return (
            <Router>
                <header>
                    <div className="header-area header-area-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-6">
                                    <div className="logo">
                                        <Link to={'/'}>
                                            <img src="/images/logo.png" alt=""
                                                 className="app-logo"/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-6">
                                    <div className="header-search-cart">
                                        <div className="header-cart common-style">
                                            <ul className="nav justify-content-end">
                                                <li className="nav-item">
                                                    <Link to={'/authors'} className="nav-link">
                                                        Authors
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={'/students'} className="nav-link">
                                                        Students
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={'/courses'} className="nav-link">
                                                        Courses
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <Switch>
                    <Route exact path={'/'} component={Author} />
                    <Route exact path={'/authors'} component={Author} />
                    <Route exact path={'/authors'} component={Author} />
                    <Route exact path={'/author/create'} component={AddAuthor} />
                    <Route exact path={'/author/edit/:id'} component={EditAuthor} />
                    <Route path={'/students'} component={Student} />
                    <Route exact path={'/student/create'} component={AddStudent} />
                    <Route exact path={'/student/edit/:id'} component={EditStudent} />
                    <Route path={'/courses'} component={Course} />
                    <Route exact path={'/course/create'} component={AddCourse} />
                    <Route exact path={'/course/edit/:id'} component={EditCourse} />
                </Switch>
            </Router>
        );
    }
}

export default Header;