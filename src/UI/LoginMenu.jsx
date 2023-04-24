import React, {useContext, useEffect} from 'react';
import ThemeToggleButton from "./ThemeToggleButton";
import {Box, Link, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {AuthContext} from '../context/index'
import {Link as ReactLink, useNavigate} from 'react-router-dom'

const LoginMenu = () => {
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
                        {localStorage.getItem('profileName')
                            ? localStorage.getItem('profileName') + ' ' + localStorage.getItem('profileSecondName')
                            : 'Войти'
                        }
                        <ChevronDownIcon/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Link as={ReactLink} to='/profile' w={'100%'}>
                                Личный кабинет
                            </Link>
                            <Link as={ReactLink} to='/taskList' w={'100%'}>
                                Задачи
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link w={'100%'} as={'a'} key='1' onClick={disconnect}>Выйти</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
                :
                <Link
                    as={ReactLink}
                    to={'/login'}
                    pt={2} paddingX={4}
                    padddingY={2}
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