import { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const PrivateRoutes = (props) => {



    const { user } = useContext(UserContext);

    return (
        <>
            {user && user.isAuthenticated === true
                ?
                <Route path={props.path} component={props.component} />
                :
                <Redirect to='/login'></Redirect>
            }
        </>

    )

}

export default PrivateRoutes;