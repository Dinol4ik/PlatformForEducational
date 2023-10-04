import {Navigate} from "react-router-dom";

const RequireStaff = ({children}) => {
    const staff = JSON.parse(localStorage.getItem('profileName')).is_staff

    if (!staff){
        return <Navigate to='/'/>
    }
    else{
        return children;
    }
};

export default RequireStaff;