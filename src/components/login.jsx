import React, {useContext, useEffect, useState} from 'react';
import {redirect, useNavigate} from "react-router-dom";
import {AuthContext} from "../context";
import authWithVk from "./authWithVk";
import ProfileId from "../API/profileAPI";
import UserNameAPI from "../API/userNameAPi";

const Login = () => {

    const {isAuth,setIsAuth} = useContext(AuthContext);
    const {profileId, setProfileId} = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(()=>{
        const strGET = window.location.search.replace( '?token=', '');
          if (strGET !== "") {
              setIsAuth('true')
              localStorage.setItem('auth', 'true')
              localStorage.setItem('token', strGET)
              fetchProfileId()
              setTimeout(()=>{navigate("/")},2000)
          }
    },[])
       async function fetchProfileId(){
        const profile = await ProfileId.getProfileId();
           localStorage.setItem('profileId', profile.id)
    }
    console.log(localStorage.getItem('profileId'))
    return (
        <div>
            <div className="auth" style={{justifyContent:"center", display:"flex"}}>
                <a style={{fontSize:"30px", marginTop:"25%"}} href='https://oauth.vk.com/authorize?client_id=51587230&display=page&redirect_uri=http://127.0.0.1:8000/token&scope=friends,email&response_type=code&v=5.131'>Войти</a>
            </div>
        </div>
    );
};

export default Login;