import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss';
import { NavLink, useLocation, Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../logo.svg'
import { logoutUser } from '../../services/userService';
import { toast } from 'react-toastify';

const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext);
    // console.log(user);
    const location = useLocation();
    const history = useHistory();

    const handleLogout = async () => {
        let data = await logoutUser(); // call api logout
        localStorage.removeItem('jwt'); // remove token in local storage
        logoutContext(); // set user to null
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            history.push('/login');
        } else {
            toast.error(data.EM)
        }
    }


    if (user?.isAuthenticated === true || location.pathname === "/" || location.pathname === '/about') {
        return (
            <>
                <div className='nav-header'>
                    <Navbar expand="lg" bg='header'>
                        <Container>
                            <Navbar.Brand href="#home">
                                <img
                                    src={logo}
                                    width="50"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                                <span>React</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink className='nav-link' exact to="/">Home</NavLink>
                                    <NavLink className='nav-link' to="/users">Users</NavLink>
                                    <NavLink className='nav-link' to="/roles">Roles</NavLink>
                                    <NavLink className='nav-link' to="/group-role">Group-Role</NavLink>
                                    <NavLink className='nav-link' to="/projects">Project</NavLink>
                                    <NavLink className='nav-link' to="/about">About</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true ?
                                        <>
                                            <NavLink className='nav-link' to="/home">
                                                Welcome {user.account.username}!
                                            </NavLink>
                                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                <NavDropdown.Item >Change Password</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item >
                                                    <span
                                                        onClick={() => handleLogout()}
                                                    >
                                                        Log out
                                                    </span>

                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <>
                                            <Link className='nav-link' to="/login">
                                                Login
                                            </Link>
                                        </>

                                    }

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