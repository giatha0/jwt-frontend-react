import { useEffect, useState } from 'react';
import './GroupRole.scss';
import { fetchGroup } from '../../services/userService';
import { fetchAllRoles, fetchRoleByGroup, assignRolesToGroup } from '../../services/roleService'
import { toast } from 'react-toastify';
import _ from 'lodash';

const GroupRole = () => {
    const [userGroup, setUserGroup] = useState([]);
    const [selectGroup, setSelectGroup] = useState('');
    const [listRoles, setListRoles] = useState([]);
    const [assignRoleByGroup, setAssignRoleByGroup] = useState([]);

    useEffect(() => {
        getGroup();
        getAllRoles();
        // getRoleByGroup();

    }, [])

    const getAllRoles = async () => {
        let res = await fetchAllRoles();
        console.log('hahha', res)
        if (res && +res.EC === 0) {
            setListRoles(res.DT)
        }
    }



    const getGroup = async () => { // get group to select option
        let res = await fetchGroup();
        if (res && +res.EC === 0) {
            setUserGroup(res.DT);

        } else {
            toast.error(res.EM);
        }
    }



    const handleOnChangeGroup = async (value) => {
        setSelectGroup(value);
        if (value) {
            let data = await fetchRoleByGroup(value)
            if (data && +data.EC === 0) {
                // setAssignRoleByGroup(data.DT)
                // console.log('data', data)
                // console.log('list role', listRoles)
                let result = buildDataRoleByGroup(data.DT.Roles, listRoles);
                // console.log('result', result)
                setAssignRoleByGroup(result)
            }

        }
    }

    const buildDataRoleByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let objectRole = {};
                objectRole.url = role.url;
                objectRole.id = role.id;
                objectRole.description = role.description;
                objectRole.checked = false;
                if (groupRoles && groupRoles.length > 0) {
                    objectRole.checked = groupRoles.some(item => item.url === role.url)
                }
                result.push(objectRole);
            })
        }
        return result;
    }

    const handleSelectRole = (value) => {
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        let index = _assignRoleByGroup.findIndex(item => +item.id === +value);
        console.log('index', index)
        if (index !== -1) {
            _assignRoleByGroup[index].checked = !_assignRoleByGroup[index].checked;
        }
        setAssignRoleByGroup(_assignRoleByGroup)
    }

    const buidDataToSave = () => {
        let result = {};
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        result.groupId = selectGroup;
        let groupRoles = _assignRoleByGroup.filter(item => item.checked === true);
        let finalGroupRoles = groupRoles.map(item => {
            return {
                groupId: +selectGroup,
                roleId: +item.id
            }
        })
        result.groupRoles = finalGroupRoles;
        return result;
    }
    const handleSave = async () => {
        // assignRolesToGroup 
        let data = buidDataToSave()
        let res = await assignRolesToGroup(data);
        if (res && +res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='row mt-3'>
                    <h4>Group Role</h4>
                </div>
                <div className='assign-group-role'>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Select Group: (<span className='red'>*</span>): </label>
                        <select
                            className={'form-select'}
                            onChange={(event) => handleOnChangeGroup(event.target.value)}
                        >
                            <option value={''} >Please select your group </option>
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
                <hr />
                {selectGroup &&
                    <div className='roles'>
                        <h5>Assign Role: </h5>
                        {
                            assignRoleByGroup && assignRoleByGroup.length > 0 &&
                            assignRoleByGroup.map((item, index) => {
                                return (
                                    <div className='form-check' key={`list-role-${index}`}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={item.id}
                                            id={`list-role-${index}`}
                                            checked={item.checked}
                                            onChange={(event) => handleSelectRole(event.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                            {item.url}
                                        </label>
                                    </div>
                                )
                            })
                        }
                        <div className='mt-3'>
                            <button
                                className='btn btn-warning'
                                onClick={() => handleSave()}
                            >Save</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default GroupRole;