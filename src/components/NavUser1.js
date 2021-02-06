import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

class NavUser1 extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link to={"/"}><span
                    className="font-weight-bold font-italic text-primary">CAR_SHARE</span></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">

                        {
                            this.props.user !== null &&
                            <Nav>
                                <Nav.Link><Link to="/profile">
                                    <span className="mr-2 text-muted"><i className="fa fa-user"/>  {this.props.user.username}</span>
                                </Link></Nav.Link>
                                <Nav.Link><Link to="/" onClick={() => {this.props.logout();}}>
                                    <span className="mr-2 text-muted">Logout</span>
                                </Link></Nav.Link>
                                <Nav.Link><Link to={"/privacy"}><span className="mr-2 text-muted">Privacy Policy</span></Link></Nav.Link>
                                <Link to={"/search"}><Button variant="outline-primary">Search <i className="fa fa-search"/></Button></Link>
                            </Nav>
                        }
                        {
                            this.props.user === null &&
                            <nav className="login-register">
                                <div className="login-register">
                                    <Nav.Link><Link to="/register"><span
                                        className="mr-2 text-muted">Register</span>
                                    </Link></Nav.Link>
                                    <Nav.Link><Link to="/login"><span className="mr-2 text-muted">Log in</span></Link></Nav.Link>
                                    <Nav.Link><Link to={"/privacy"}><span
                                        className="mr-2 text-muted">Privacy Policy</span></Link></Nav.Link>
                                    <Link to={"/search"}><Button variant="outline-primary">Search <i
                                        className="fa fa-search"/></Button></Link>
                                </div>
                            </nav>
                        }


                </Navbar.Collapse>
            </Navbar>

        );
    }
}

export default NavUser1;
