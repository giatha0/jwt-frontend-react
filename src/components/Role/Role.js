import { useEffect, useState } from 'react';
import './Role.scss';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';


const Role = (props) => {


    const [listChilds, setListChilds] = useState({
        child1: { url: '', description: '' }
    })




    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        setListChilds(_listChilds);
    }

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child${uuidv4()}`] = { url: '', description: '' };
        setListChilds(_listChilds);
    }

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    }

    return (
        <>
            <div className='role-container'>
                <div className='container'>
                    <div className='mt-3'>
                        <div className='title-row'>
                            <h4 >Add a new role</h4>
                        </div>
                        <div className='role-parent'>
                            {
                                Object.entries(listChilds).map(([key, value], index) => {
                                    return (
                                        <>
                                            <div className={`row role-child ${key}`}>
                                                <div className='col-5 form-group'>
                                                    <label>URL: </label>
                                                    <input
                                                        type='text'
                                                        className='form-control'
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
                            <button className='btn btn-warning mt-3'>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Role;