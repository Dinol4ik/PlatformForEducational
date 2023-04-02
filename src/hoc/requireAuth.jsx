import {useLocation, Navigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context";

const RequireAuth = ({children}) => {
    const auth = localStorage.getItem('auth')

    if (!auth){
        return <Navigate to='/login'/>
    }
    return children;
};

export default RequireAuth;