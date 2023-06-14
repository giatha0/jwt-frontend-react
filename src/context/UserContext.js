import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {


    const [user, setUser] = useState(
        {
            isAuthenticated: false,
            token: "",
            account: {}
        }
    );

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser(userData)
    }

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };

    const fetchUserAccount = async () => {
        let res = await getUserAccount()
        if (res?.EC === 0) {
            let groupWithRoles = res.DT.data;
            let email = res.DT.email;
            let username = res.DT.username;
            let token = res.DT.access_token

            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username }
            }
            setUser(data)
        }
    }

    useEffect(() => {
        fetchUserAccount()
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };