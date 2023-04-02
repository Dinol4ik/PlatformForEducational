import { useLocation, Navigate } from 'react-router-dom'
import React, {useContext} from 'react';
import {AuthContext} from "./AuthContext";

const RequireAuth = ({children}) => {
    const location = useLocation()
    const {isAuth} = useContext(AuthContext)

    if (!isAuth){
        return <Navigate to={'/account'} state={{from: location}}/>
    }

    return children
};

export default RequireAuth;