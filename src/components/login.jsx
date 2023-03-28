import React, {useContext, useEffect, useState} from 'react';
import {redirect, useNavigate} from "react-router-dom";
import {AuthContext} from "../context";

const Login = () => {
    const [token,setToken] = useState('')
    const navigate = useNavigate();
    useEffect(()=>{
        const strGET = window.location.search.replace( '?token=', '');
          if (strGET !== "") {
              setToken(strGET)
              // navigate("/buy")
          }
    },[])

    return (
        <div>
              <a href='https://oauth.vk.com/authorize?client_id=51587230&display=page&redirect_uri=http://127.0.0.1:8000/token&scope=friends,email&response_type=code&v=5.131'>Войти</a>
<button onClick={()=>{console.log(token)}}>Получение токена</button>
        </div>
    );
};

export default Login;