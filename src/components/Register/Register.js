import React, { useEffect } from 'react';
import './Register.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Register = (props) => {
    const history = useHistory();

    const handleLoginAccount = () => {
        history.push('/login');
    }

    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=2').then(res => {
            console.log('check data', res.data);
        })
    }, [])

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
                            <input id='email' className='form-control' type="text" placeholder="Email address" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="phone">Phone number: </label>
                            <input id='phone' className='form-control' type="text" placeholder="Phone number" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="username">Username: </label>
                            <input id='username' className='form-control' type="text" placeholder="Username" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password: </label>
                            <input id='password' className='form-control' type="password" placeholder="Password" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="confirm-password">Confirm Password: </label>
                            <input id='confirm-password' className='form-control' type="password" placeholder="Confirm Password" />
                        </div>
                        <button className='btn btn-primary'>Create Account</button>
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