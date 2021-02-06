import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

class Nav1 extends Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link to={"/"}><span
                    className="font-weight-bold font-italic text-primary">CAR_SHARE</span></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link><Link to="/register"><span
                            className="mr-2 text-muted">Register</span> </Link></Nav.Link>
                        <Nav.Link><Link to="/login"><span className="mr-2 text-muted">Log in</span></Link></Nav.Link>
                        <Nav.Link><Link to={"/privacy"}><span className="mr-2 text-muted">Privacy Policy</span>
                        </Link></Nav.Link>
                        <Link to={"/search"}><Button variant="outline-primary">Search <i
                            className="fa fa-search"/></Button></Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>

        );
    }
}

export default Nav1;
