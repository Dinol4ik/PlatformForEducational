import React, {useContext, useEffect, useState} from 'react';
import ThemeToggleButton from "./ThemeToggleButton";
import {Box, Link, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";
import {AuthContext} from '../context/index'
import {Link as ReactLink, useNavigate} from 'react-router-dom'

const LoginMenu = () => {
    const [icon, setIcon] = useState('close')
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate();
    const {setToken} = useContext(AuthContext)
    let loginColor = ''

    useEffect(() => {
        loginColor = (localStorage.getItem('chakra-ui-color-mode') === 'light') ? 'black' : 'white'
    })

    function disconnect() {
        setIsAuth(false)
        setToken(false)
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        localStorage.removeItem('profileName')
        localStorage.removeItem('profileId')
        localStorage.removeItem('UserProfileId')

        navigate("/")
    }

    function changeMyIcon() {
        if (icon === 'close')
            setIcon('up')
        else
            setIcon('close')
    }

    return (
        <Box display={'flex'} w={'100%'} justifyContent={'flex-end'} maxH={10}>
            <ThemeToggleButton/>
            {isAuth
                ?
                <Menu borderRadius={'2em'}>
                    <MenuButton onClick={changeMyIcon}>
                        {localStorage.getItem('profileName')
                            ? JSON.parse(localStorage.getItem('profileName')).first_name + ' ' + JSON.parse(localStorage.getItem('profileName')).last_name
                            : 'Войти'
                        }
                        {(icon === 'close')
                            ? <ChevronDownIcon/>
                            : <ChevronUpIcon/>}
                    </MenuButton>
                    <MenuList p={0} overflow={'hidden'}>
                        <MenuItem as={ReactLink} to='/profile' w={'100%'} h={'100%'}>
                                Личный кабинет
                        </MenuItem>
                        <MenuItem as={ReactLink} to='/taskList' w={'100%'}>
                                Задачи
                        </MenuItem>
                        <MenuItem w={'100%'} as={ReactLink} to='/profile/homework'>
                            Домашние задания
                        </MenuItem>
                        <MenuItem w={'100%'} as={'a'} key='1' onClick={disconnect}>
                            Выйти
                        </MenuItem>
                    </MenuList>
                </Menu>
                :
                <Link
                    as={ReactLink}
                    to={'/login'}
                    pt={2} paddingX={4}
                    paddingY={2}
                    borderRadius={'1em'}
                    color={loginColor}
                    _hover={{backgroundColor: '#1D8CC7', color: 'white'}}
                >
                    Войти
                </Link>
            }
        </Box>
    );
};

export default LoginMenu;