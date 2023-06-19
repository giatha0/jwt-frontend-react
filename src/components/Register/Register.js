import React, { useContext, useEffect, useState } from 'react';
import './Register.scss';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import { registerNewUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';

const Register = (props) => {
    const { user } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    };
    const [objCheckValid, setObjCheckValid] = useState(defaultValidInput);

    const history = useHistory();

    const handleLoginAccount = () => {
        history.push('/login');
    }

    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/');
        }

    }, [])

    const isValidInputs = () => {
        setObjCheckValid(defaultValidInput);
        if (!email) {
            toast.error('Email is required');
            setObjCheckValid({
                ...objCheckValid,
                isValidEmail: false
            });
            return false;
        }

        let regxEmail = /\S+@\S+\.\S+/;
        if (!regxEmail.test(email)) {
            toast.error('Email is invalid');
            setObjCheckValid({
                ...objCheckValid,
                isValidEmail: false
            });
            return false;
        }
        if (!phone) {
            toast.error('Phone is required');
            setObjCheckValid({
                ...objCheckValid,
                isValidPhone: false
            });
            return false;
        }
        let regxPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!regxPhone.test(phone)) {
            toast.error('Phone is invalid');
            setObjCheckValid({
                ...objCheckValid,
                isValidPhone: false
            });
            return false;
        }

        if (!username) {
            toast.error('Username is required');
            setObjCheckValid({
                ...objCheckValid,
                isValidUsername: false
            });
            return false;
        }
        let usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(username)) {
            toast.error('Username is invalid');
            setObjCheckValid({
                ...objCheckValid,
                isValidUsername: false
            });
            return false;
        }

        if (!password) {
            toast.error('Password is required');
            setObjCheckValid({
                ...objCheckValid,
                isValidPassword: false
            });
            return false;
        }
        // let regxPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        // if (!regxPassword.test(password)) {
        //     toast.error('Password is invalid');
        //     return false;
        // }

        if (password !== confirmPassword) {
            toast.error('Password and confirm password must be the same');
            setObjCheckValid({
                ...objCheckValid,
                isValidConfirmPassword: false
            });
            return false;
        }


        return true;
    }

    const handleRegister = async () => {
        let check = isValidInputs();
        // console.log('check', check);
        if (check === true) {
            let res = await registerNewUser(email, phone, username, password)
            console.log('res', res);
            if (res && +res.EC === 0) {
                toast.success(res.EM);
                history.push('/login');
            }
            else {
                toast.error(res.EM);
            }
        }
    }



    return (
        <div className="register-container ">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            <Link to='/' className='text-decoration-none'>
                                <span>Thao Duong Gia</span>
                            </Link>

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
                                className={objCheckValid.isValidEmail ? 'form-control' : 'form-control is-invalid'}
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
                                className={objCheckValid.isValidPhone ? 'form-control' : 'form-control is-invalid'}
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
                                className={objCheckValid.isValidUsername ? 'form-control' : 'form-control is-invalid'}
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
                                className={objCheckValid.isValidPassword ? 'form-control' : 'form-control is-invalid'}
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
                                className={objCheckValid.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
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
                            <div className='mt-3 return '>
                                <Link to='/' className='text-decoration-none'>
                                    <i className="fa fa-arrow-circle-left"></i>
                                    <span className='ms-1' title='Return to HomePage'>Return to HomePage</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;