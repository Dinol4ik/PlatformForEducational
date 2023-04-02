import React, {useContext} from 'react';
import ThemeToggleButton from "./ThemeToggleButton";
import {Box, Link, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {CalendarIcon, ChevronDownIcon} from "@chakra-ui/icons";
import {AuthContext} from '../context/AuthContext'
import {Link as ReactLink} from 'react-router-dom'

const LoginMenu = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    return (
        <Box display={'flex'} w={'100%'} justifyContent={'flex-end'}>
            <ThemeToggleButton/>
            {isAuth
                ?
                <Menu>
                    <MenuButton>
                        Профиль
                        <ChevronDownIcon/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Link
                                as={ReactLink}
                                to=''
                            >
                                Личный кабинет
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                as={ReactLink}
                                to='/schedule'
                            >
                                <Text>
                                    Календарь
                                    <CalendarIcon ml={5}/>
                                </Text>
                            </Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
                :
                <Link href={'/account'}>Войти</Link>}
        </Box>
    );
};

export default LoginMenu;