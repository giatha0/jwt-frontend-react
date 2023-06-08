
import { useEffect, useState } from 'react';
import './Users.scss'
import { fetchAllUsers, deleteUser } from '../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDeleteUser from './ModalDeleteUser';

const Users = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPage, setTotalPage] = useState(0);
    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
    const [dataModalDeleteUser, setDataModalDeleteUser] = useState({});

    const fetchUsers = async () => {
        let res = await fetchAllUsers(currentPage, currentLimit);
        if (res && res.data && +res.data.EC === 0) {
            console.log('check data', res.data);
            setListUsers(res.data.DT.users);
            setTotalPage(res.data.DT.totalPages);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [currentPage])

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = async (user) => {
        setIsShowModalDeleteUser(true);
        setDataModalDeleteUser(user);
    }

    const handleClose = () => {
        setIsShowModalDeleteUser(false);
        setDataModalDeleteUser({});
    }

    const confirmDeleteUser = async () => {
        let res = await deleteUser(dataModalDeleteUser);
        if (res && res.data && +res.data.EC === 0) {
            fetchUsers();
            toast.success(res.data.EM);
            handleClose();
        } else {
            toast.error(res.data.EM);
        }
    }

    return (
        <>
            <div className='container'>
                <div className='manage-users-container'>
                    <div className='user-header my-3'>
                        <div className='title'>
                            <h3>Table Users</h3>
                        </div>
                        <div className='action'>
                            <button className='btn btn-success'>Refresh</button>
                            <button className='btn btn-primary'>Add new user</button>
                        </div>
                    </div>
                    <div className='user-body'>
                        <table className='table table-striped table-hover table-bordered'>
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th>Group</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className='btn btn-warning me-3'>Edit</button>
                                                        <button
                                                            className='btn btn-danger'
                                                            onClick={() => handleDeleteUser(item)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td colSpan={5}>
                                                Not Found User
                                            </td>
                                        </tr>
                                    </>
                                }

                            </tbody>
                        </table>
                    </div>
                    {totalPage > 0 &&
                        <div className='user-footer'>
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={1}
                                marginPagesDisplayed={1}
                                pageCount={totalPage}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>
            <ModalDeleteUser
                show={isShowModalDeleteUser}
                setShow={setIsShowModalDeleteUser}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModalDeleteUser}
            />
        </>
    )
}

export default Users