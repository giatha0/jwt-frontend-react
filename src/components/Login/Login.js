import React from 'react';
import './Login.scss';

const Login = (props) => {
    return (
        <div className="login-container ">
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
                        <input className='form-control' type="text" placeholder="Email address or phone number" />
                        <input className='form-control' type="password" placeholder="Password" />
                        <button className='btn btn-primary'>Log In</button>
                        <span className='text-center'>
                            <a href="#" className='forgot-password'>
                                Forgot Password
                            </a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'>Create New Account</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;