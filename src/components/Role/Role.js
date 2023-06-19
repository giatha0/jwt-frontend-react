import { useEffect, useRef, useState } from 'react';
import './Role.scss';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createRole } from '../../services/roleService';
import TableRole from './TableRole';

const Role = (props) => {


    const dataChildDefault = { url: '', description: '', isValidUrl: true };

    const [listChilds, setListChilds] = useState({
        child1: dataChildDefault
    })
    const childRef = useRef();



    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        if (name === 'url') {
            _listChilds[key].isValidUrl = true;
        }

        setListChilds(_listChilds);
    }

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child${uuidv4()}`] = dataChildDefault;
        setListChilds(_listChilds);
    }

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    }

    const buildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        Object.entries(_listChilds).find(([key, value], index) => {
            result.push({
                url: value.url,
                description: value.description
            })
        })
        return result;
    }

    const handleSave = async () => {

        let inValidObject = Object.entries(listChilds).find(([key, value], index) => {
            return value && !value.url
        })

        console.log(inValidObject);
        if (!inValidObject) {
            // call api
            let data = buildDataToPersist();
            console.log('data1', data);
            let res = await createRole(data);
            console.log(res);
            if (res && +res.EC === 0) {
                toast.success(res.EM);
                childRef.current.refresh();
                console.log('child ref', childRef.current)
            } else {
                toast.error(res.EM);
            }
        } else {
            // error
            toast.error('Please enter url');
            let _listChilds = _.cloneDeep(listChilds);
            _listChilds[inValidObject[0]].isValidUrl = false;
            setListChilds(_listChilds);
        }
    }


    return (
        <>
            <div className='role-container'>
                <div className='container'>
                    <div className='add-roles mt-3'>
                        <div className='title-row'>
                            <h4 >Add a new role</h4>
                        </div>
                        <div className='role-parent'>
                            {
                                Object.entries(listChilds).map(([key, value], index) => {
                                    // console.log('1', value);
                                    return (
                                        <>
                                            <div className={`row role-child ${key}`}>
                                                <div className='col-5 form-group'>
                                                    <label>URL: </label>
                                                    <input
                                                        type='text'
                                                        className={value.isValidUrl ? 'form-control' : 'form-control is-invalid'}
                                                        value={value.url}
                                                        onChange={(e) => handleOnchangeInput('url', e.target.value, key)}
                                                    />
                                                </div>
                                                <div className='col-5 form-group'>
                                                    <label>Description: </label>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        value={value.description}
                                                        onChange={(e) => handleOnchangeInput('description', e.target.value, key)} />
                                                </div>
                                                <div className='col-2 form-group mt-4 actions'>
                                                    {/* <button className='btn btn-primary '>Add</button> */}
                                                    <i
                                                        className="fa fa-plus-circle add"
                                                        onClick={handleAddNewInput}
                                                    ></i>
                                                    {
                                                        Object.keys(listChilds).length > 1 &&
                                                        <i
                                                            className="fa fa-trash delete"
                                                            onClick={() => handleDeleteInput(key)}
                                                        ></i>
                                                    }

                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                        </div>
                        <div>
                            <button
                                className='btn btn-warning mt-3'
                                onClick={handleSave}
                            >Save</button>
                        </div>
                    </div>
                    <hr />
                    <div className='mt-3'>
                        <h4>List Current Role: </h4>
                        <TableRole ref={childRef} />
                    </div>
                </div>

            </div>
        </>
    );
}

export default Role;