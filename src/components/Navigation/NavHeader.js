import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../logo.svg'

const NavHeader = (props) => {
    const { user } = useContext(UserContext);
    const location = useLocation();


    if (user?.isAuthenticated === true || location.pathname === "/") {
        return (
            <>
                {/* <div>
                    <div className="topnav">
                        <NavLink to="/" exact>Home</NavLink>
                        <NavLink to="/users">Users</NavLink>
                        <NavLink to="/projects">Projects</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                </div> */}
                <div className='nav-header'>
                    <Navbar expand="lg" bg='header' className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="#home">
                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                // alt="React Bootstrap logo"
                                />
                                <span>React</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink className='nav-link' exact to="/">Home</NavLink>
                                    <NavLink className='nav-link' to="/users">Users</NavLink>
                                    <NavLink className='nav-link' to="/projects">Project</NavLink>
                                    <NavLink className='nav-link' to="/about">About</NavLink>
                                </Nav>
                                <Nav>
                                    <Nav.Link href="#home">
                                        Welcome T
                                    </Nav.Link>
                                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        )
    } else {
        return <></>
    }


}

export default NavHeader;