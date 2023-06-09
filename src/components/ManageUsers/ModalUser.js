import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup, createNewUser } from '../services/userService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {

    const { action, dataModalUser } = props;

    const [userGroup, setUserGroup] = useState([]);

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: '',
    }
    const validInputsDefult = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidAddress: true,
        isValidSex: true,
        isValidGroup: true,
    }
    const [userData, setUserData] = useState(defaultUserData);
    const [validInput, setValidInput] = useState(validInputsDefult);

    useEffect(() => {
        getGroup()

    }, [])

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' })
            console.log('check', { ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' })
        }
    }, [dataModalUser])

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroup && userGroup.length > 0) {
                setUserData({
                    ...defaultUserData,
                    group: userGroup[0].id
                })
            }
        }
    }, [action])


    const getGroup = async () => { // get group to select option
        let res = await fetchGroup();
        if (res && res.data && +res.data.EC === 0) {
            setUserGroup(res.data.DT);
            if (res.data.DT && res.data.DT.length > 0) {
                setUserData({
                    ...userData,
                    group: res.data.DT[0].id // set default value
                })
            }
        } else {
            toast.error(res.data.EM);
        }
    }


    const handleOnchangInput = (value, name) => { // set value for input
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const checkValidataUser = () => { // check validata user
        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;
        let _validInputsDefult = _.cloneDeep(validInputsDefult)
        for (let i = 0; i < arr.length; i++) { // if empty set false
            if (!userData[arr[i]]) { // check empty
                // clone object
                _validInputsDefult[`isValid${arr[i].charAt(0).toUpperCase() + arr[i].slice(1)}`] = false; // set false 
                setValidInput(_validInputsDefult); // set state
                check = false;
                toast.error(`Please input ${arr[i]}`);
                break;
            }
        }
        // let regxEmail = /\S+@\S+\.\S+/;
        // if (!regxEmail.test(userData.email)) {
        //     toast.error('Email is invalid');
        //     _validInputsDefult.isValidEmail = false;
        //     setValidInput(_validInputsDefult);
        //     check = false;
        // }
        return check;
    }

    const handleConfirm = async () => {
        let check = checkValidataUser();
        if (check) {
            let res = await createNewUser({ ...userData, groupId: userData['group'] }); // create new user with groupId = group
            if (res && res.data && +res.data.EC === 0) {
                toast.success(res.data.EM);
                props.handleClose();
                setUserData({ ...defaultUserData, group: userGroup[0].id }); // set default value with defult group
            } else {
                toast.error(res.data.EM);
                let _validInputsDefult = _.cloneDeep(validInputsDefult); // clone object
                _validInputsDefult[`isValid${res.data.DT.charAt(0).toUpperCase() + res.data.DT.slice(1)}`] = false; // set false 
                setValidInput(_validInputsDefult);
            }
        }
    }

    const handleCloseModalUser = () => {
        props.handleClose();

    }

    return (
        <>

            <Modal
                size='lg'
                show={props.show}
                onHide={handleCloseModalUser}
                className='modal-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{props.action === 'CREATE' ? "Create new user" : "Edit user"}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email (<span className='red'>*</span>) :</label>
                            <input
                                className={validInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                type='email'
                                disabled={action === 'UPDATE'}
                                value={userData.email}
                                onChange={(e) => handleOnchangInput(e.target.value, 'email')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number (<span className='red'>*</span>): </label>
                            <input
                                className={validInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                disabled={action === 'UPDATE'}
                                value={userData.phone}
                                onChange={(e) => handleOnchangInput(e.target.value, 'phone')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>User name: </label>
                            <input
                                className={validInput.isValidUsername ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.username}
                                onChange={(e) => handleOnchangInput(e.target.value, 'username')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            {action === 'CREATE' &&
                                <>
                                    <label>Password (<span className='red'>*</span>): </label>
                                    <input
                                        className={validInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                        type='password'
                                        value={userData.password}
                                        onChange={(e) => handleOnchangInput(e.target.value, 'password')}
                                    />
                                </>
                            }

                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address: </label>
                            <input
                                className={validInput.isValidAddress ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.address}
                                onChange={(e) => handleOnchangInput(e.target.value, 'address')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender: </label>
                            <select
                                className={validInput.isValidSex ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                onChange={(e) => handleOnchangInput(e.target.value, 'sex')}
                                value={userData.sex}
                            >
                                <option selected defaultValue={"Male"}>Male</option>
                                <option Value={"Female"}>Female</option>
                                <option Value={"Other"}>Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group (<span className='red'>*</span>): </label>
                            <select
                                className={validInput.isValidGroup ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                onChange={(e) => handleOnchangInput(e.target.value, 'group')}
                                value={userData.group}
                            >
                                {userGroup && userGroup.length > 0 &&
                                    userGroup.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} Value={item.id}>{item.name}</option>
                                        )
                                    }
                                    )}

                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalUser}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleConfirm();
                        }}
                    >
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;