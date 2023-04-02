import React, {useContext, useEffect, useState} from 'react';
import {Link as ReactLink, redirect, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {Button, Container, Link} from "@chakra-ui/react";

const Login = () => {
    const [token,setToken] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const fromPage = location.state?.from?.pathname || '/'

    useEffect(()=>{
        if (isAuth) return navigate(fromPage)

        const strGET = location.search.replace( '?token=', '');
            if (strGET !== "") {
                setToken(strGET)
                setIsAuth(true)
                navigate(fromPage)
            }
    },[])

    // const handle = () => {
    //     console.log(token)
    //     redirect('https://oauth.vk.com/authorize?client_id=51587230&display=page&redirect_uri=http://127.0.0.1:8000/token&scope=friends,email&response_type=code&v=5.131')
    // }


    return (
        <Container
                display={'flex'}
                w={'100%'}
                h={'500px'}
                alignItems={'center'}
                justifyContent={'center'}
                flexWrap={'wrap'}
            >
            <Link
                bg={'#0399E9'}
                color={'white'}
                paddingX={14}
                paddingY={6}
                fontSize={'20px'}
                borderRadius={'1em'}
                href={'https://oauth.vk.com/authorize?client_id=51587230&display=page&redirect_uri=http://127.0.0.1:8000/token&scope=friends,email&response_type=code&v=5.131'}
            >
                Войти
            </Link>
        </Container>
    );
};

export default Login;