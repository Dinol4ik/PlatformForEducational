import React, {useContext} from 'react';
import ThemeToggleButton from "./ThemeToggleButton";
import {Box, Icon, Link, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue} from "@chakra-ui/react";
import {CalendarIcon, ChevronDownIcon} from "@chakra-ui/icons";
import {AuthContext} from '../context/index'
import {Link as ReactLink, useNavigate} from 'react-router-dom'

const LoginMenu = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate();
    const {token,setToken}= useContext(AuthContext)

    function disconnect(){
        setIsAuth(false)
        setToken(false)
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        localStorage.removeItem('profileName')
        localStorage.removeItem('profileSecondName')
        localStorage.removeItem('profileId')

        navigate("/")
    }

    return (
        <Box display={'flex'} w={'100%'} justifyContent={'flex-end'} maxH={10}>
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
                            <Link as={'a'} key='1' onClick={disconnect}>Выйти</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
                :
                <Link
                    href={'/login'}
                    pt={2} paddingX={4}
                    padddingY={2}
                >
                    Войти
                </Link>
            }
        </Box>
    );
};

export default LoginMenu;