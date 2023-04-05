import React, {useContext} from 'react';
import ThemeToggleButton from "./ThemeToggleButton";
import {Box, Link, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {CalendarIcon, ChevronDownIcon} from "@chakra-ui/icons";
import {AuthContext} from '../context/index'
import {Link as ReactLink, useNavigate} from 'react-router-dom'

const LoginMenu = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate();
    const {token,setToken}= useContext(AuthContext)
    const {profileName,setProfileName}= useContext(AuthContext)
    const {profileId, setProfileId} = useContext(AuthContext)

    function disconnect(){
        setIsAuth(false)
        setToken(false)
        // localStorage.clear()
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        localStorage.removeItem('profileName')
        localStorage.removeItem('profileSecondName')
        localStorage.removeItem('profileId')

        navigate("/")
    }

    return (
        <Box display={'flex'} w={'100%'} justifyContent={'flex-end'}>
            <ThemeToggleButton/>
            {isAuth
                ?
                <Menu>
                    <MenuButton>
                        { localStorage.getItem('profileName')
                            ? localStorage.getItem('profileName') + ' ' + localStorage.getItem('profileSecondName')
                            : 'Войти'
                        }
                        <ChevronDownIcon/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Link as={ReactLink} to='/profile'>
                                Личный кабинет
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link as={ReactLink} to='/schedule'>
                                <Text>
                                    Календарь
                                    <CalendarIcon ml={5}/>
                                </Text>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link as={'a'} key='1' onClick={disconnect}>Выйти</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
                :
                <Link href={'/account'}>Войти</Link>}
        </Box>
    );
};

export default LoginMenu;