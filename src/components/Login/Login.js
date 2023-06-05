import React from 'react';
import './Login.scss';

const Login = (props) => {
    return (
        <div className="login-container mt-3">
            <div className="container">
                <div className="row">
                    <div className="content-left col-7">
                        <div className='brand'>
                            Thao Duong Gia
                        </div>
                        <div className='detail'>
                            Thao Duong Gia helps you connect and share with the people in your life.
                        </div>
                    </div>
                    <div className="content-right col-5 d-flex flex-column gap-3 py-3">
                        <input className='form-control' type="text" placeholder="Email address or phone number" />
                        <input className='form-control' type="password" placeholder="Password" />
                        <button className='btn btn-primary'>Log In</button>
                        <span className='text-center'>Fotgot Your Password </span>
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