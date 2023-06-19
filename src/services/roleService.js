import axios from '../setup/axios';

const fetchAllRoles = (page, limit) => {
    if (!page && !limit) return axios.get('/api/v1/role/show')

    return axios.get(`/api/v1/role/show?page=${page}&limit=${limit}`)
}

const createRole = (roles) => {
    return axios.post('/api/v1/role/create', [...roles])
}

const deleteRole = (role) => {
    return axios.delete(`/api/v1/role/delete`, { data: { id: role.id } })
}

const fetchRoleByGroup = (groupId) => {
    return axios.get(`/api/v1/role/by-group/${groupId}`)
}

const assignRolesToGroup = (data) => {
    return axios.post('/api/v1/role/assign-to-group', { data })
}

export {
    createRole, fetchAllRoles, deleteRole, fetchRoleByGroup, assignRolesToGroup
}