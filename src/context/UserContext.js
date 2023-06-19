import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";


const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {

    const userDefaultData = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    }
    const [user, setUser] = useState(userDefaultData);


    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
    }

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({ ...userDefaultData, isLoading: false })
    };

    const fetchUserAccount = async () => {
        const res = await getUserAccount();
        if (+res?.EC === 0) {
            let groupWithRoles = res.DT.groupWithRoles;
            let email = res.DT.email;
            let username = res.DT.username;
            let token = res.DT.access_token

            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username },
                isLoading: false
            }
            setTimeout(() => {
                setUser(data)
            }, 1000)

        }
        else {
            setUser({ ...userDefaultData, isLoading: false })
        }
    }

    useEffect(() => {
        // if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
        //     fetchUserAccount();
        // } else {
        //     setUser({ ...user, isLoading: false })
        // }
        fetchUserAccount();
    }, [])


    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };