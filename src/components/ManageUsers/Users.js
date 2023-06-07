import { useEffect } from 'react'
import './Users.scss'
import { useHistory } from 'react-router-dom'

const Users = (props) => {
    const history = useHistory();
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (!session) {
            history.push('/login');
        }
    }, [])
    return (
        <div>
            user component
        </div>
    )
}

export default Users