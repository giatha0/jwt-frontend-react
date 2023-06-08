import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup } from '../services/userService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ModalUser = (props) => {

    const [userGroup, setUserGroup] = useState([]);

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [sex, setSex] = useEffect('');
    const [group, setGroup] = useState('');


    useEffect(() => {
        getGroup()
    }, [])

    const getGroup = async () => {
        let res = await fetchGroup();
        if (res && res.data && +res.data.EC === 0) {
            setUserGroup(res.data.DT)
        } else {
            toast.error(res.data.EM)
        }
    }

    return (
        <>

            <Modal
                size='lg'
                show={props.show}
                onHide={props.handleClose}
                className='modal-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{props.title}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email (<span className='red'>*</span>) :</label>
                            <input className='form-control' type='email' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number (<span className='red'>*</span>): </label>
                            <input className='form-control' type='text' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>User name: </label>
                            <input className='form-control' type='text' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Password (<span className='red'>*</span>): </label>
                            <input className='form-control' type='password' />
                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address: </label>
                            <input className='form-control' type='text' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender: </label>
                            <select className='form-select' type='text' >
                                <option selected defaultValue={"Male"}>Male</option>
                                <option Value={"Female"}>Female</option>
                                <option Value={"Other"}>Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group (<span className='red'>*</span>): </label>
                            <select className='form-select' type='text' >
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
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;