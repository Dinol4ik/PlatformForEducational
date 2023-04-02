import React, {useContext} from 'react';
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";

const AuthWithVk = () => {
    const navigate = useNavigate()
 const {isAuth}= useContext(AuthContext)
    if(!isAuth){
        navigate('/')
    }
    return (
        <div>
            <h1>{localStorage.getItem('profileName')}</h1>
            <h1>{localStorage.getItem('profileSecondName')}</h1>
        </div>
    );
};

export default AuthWithVk;