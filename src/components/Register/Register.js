import React, { useEffect, useState } from 'react';
import './Register.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Register = (props) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const history = useHistory();

    const handleLoginAccount = () => {
        history.push('/login');
    }

    useEffect(() => {
        // axios.get('http://localhost:8080/api/test-api').then(res => {
        //     console.log('check data', res.data);
        // })
    }, [])

    const handleRegister = () => {
        let userData = {
            email: email,
            phone: phone,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        }
        console.log('check data', userData);
    }

    return (
        <div className="register-container ">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            Thao Duong Gia
                        </div>
                        <div className='detail'>
                            Thao Duong Gia helps you connect and share with the people in your life.
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
                        <div className='brand d-sm-none d-block '>
                            Thao Duong Gia
                        </div>
                        <div className='form-group'>
                            <label htmlFor="email">Email: </label>
                            <input
                                id='email'
                                className='form-control'
                                type="text"
                                placeholder="Email address"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="phone">Phone number: </label>
                            <input
                                id='phone'
                                className='form-control'
                                type="text"
                                placeholder="Phone number"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="username">Username: </label>
                            <input
                                id='username'
                                className='form-control'
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password: </label>
                            <input
                                id='password'
                                className='form-control'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="confirm-password">Confirm Password: </label>
                            <input
                                id='confirm-password'
                                className='form-control'
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button
                            className='btn btn-primary'
                            onClick={() => handleRegister()}
                        >
                            Register</button>
                        <hr />
                        <div className='text-center'>
                            <button
                                className='btn btn-success'
                                onClick={() => handleLoginAccount()}
                            >
                                Already have an account? Log In
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;