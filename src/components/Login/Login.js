import React, { useEffect, useState } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../services/userService';

const Login = (props) => {
    const history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");


    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidValuePassword: true,
    }
    const [objValueInput, setObjValueInput] = useState(defaultObjValidInput);


    const handleCreateNewAccount = () => {
        history.push('/register');
    }

    const handleLogin = async () => {
        setObjValueInput(defaultObjValidInput);
        if (!valueLogin) {
            setObjValueInput({
                ...objValueInput,
                isValidValueLogin: false
            });
            toast.error('Please enter your email or phone number');
            return;
        }
        if (!password) {
            setObjValueInput({
                ...objValueInput,
                isValidValuePassword: false
            });
            toast.error('Please enter your password');
            return;
        }

        let res = await loginUser(valueLogin, password);
        if (res && res.data && +res.data.EC === 0) {
            let data = {
                isAuthenticated: true,
                token: 'fake token',
            }
            sessionStorage.setItem("account", JSON.stringify(data));
            history.push('/users');
            window.location.reload();
            toast.success(res.data.EM);
            // redux
        }

        if (res && res.data && +res.data.EC !== 0) {
            toast.error(res.data.EM);
        }
    }

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            history.push('/');
            window.location.reload();
        }
    }, [])
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
                        <input
                            className={objValueInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                            type="text"
                            placeholder="Email address or phone number"
                            value={valueLogin}
                            onChange={(event) => { setValueLogin(event.target.value) }}
                        />
                        <input
                            className={objValueInput.isValidValuePassword ? 'form-control' : 'form-control is-invalid'}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button
                            className='btn btn-primary'
                            onClick={() => handleLogin()}
                        >
                            Log In
                        </button>
                        <span className='text-center'>
                            <a href="" className='forgot-password'>
                                Forgot Password
                            </a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button
                                className='btn btn-success'
                                onClick={() => handleCreateNewAccount()}
                            >
                                Create New Account
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;