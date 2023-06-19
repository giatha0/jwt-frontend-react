import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { fetchAllRoles, deleteRole } from '../../services/roleService'
import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate';

const TableRole = forwardRef((props, ref) => {
    let CURRENT_LIMIT = 3;

    const [listRoles, setListRoles] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [currentLimit, setCurrentLimit] = useState(CURRENT_LIMIT);



    useEffect(() => {
        getAllRoles();
    }, [])


    useImperativeHandle(ref, () => ({
        async refresh() {
            await getAllRoles();
        }
    }));

    const getAllRoles = async () => {
        let res = await fetchAllRoles(currentPage, currentLimit);
        console.log(res)
        if (res && +res.EC === 0) {
            setListRoles(res.DT.roles)
            setTotalPages(res.DT.totalPages)
        }
    }

    const handleDeleteRole = async (role) => {
        let res = await deleteRole(role);
        if (res && +res.EC === 0) {
            toast.success(res.EM)
            await getAllRoles();
        } else {
            toast.error(res.EM)
        }
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    }

    useEffect(() => {
        getAllRoles()
    }, [currentPage])
    return (
        <>
            <table className='table table-striped table-hover table-bordered'>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Url</th>
                        <th scope="col">Description</th>
                        <th scope="col">Group</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ?
                        <>
                            {listRoles.map((item, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>
                                        <td>{item['Groups.name']}</td>
                                        <td>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteRole(item)}
                                                title='Delete'
                                            >
                                                <i className="fa fa-trash" ></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                        :
                        <>
                            <tr>
                                <td colSpan={4}>
                                    Not Found Role
                                </td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
            {totalPages > 0 &&
                <div className='user-footer d-flex flex-column justify-content-center align-items-center '>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
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
        </>
    )
})

export default TableRole;