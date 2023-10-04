import {Navigate} from "react-router-dom";

const RequireAuth = ({children}) => {
    const auth = localStorage.getItem('auth')

    if (!auth){
        return <Navigate to='/login'/>
    }
    return children;
};

export default RequireAuth;