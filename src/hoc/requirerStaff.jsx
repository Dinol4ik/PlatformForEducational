import {useLocation, Navigate} from "react-router-dom";
import {useState} from "react";

const RequireStaff = ({children}) => {
    const staff = useState(JSON.parse(localStorage.getItem('profileName')).is_staff)

    if (!staff){
        return <Navigate to='/'/>
    }
    return children;
};

export default RequireStaff;