import React, {useContext, useEffect} from 'react';
import ThemeToggleButton from "./ThemeToggleButton";
import {
    Box,
    Divider,
    Link,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    useColorModeValue, Button
} from "@chakra-ui/react";
import {CalendarIcon, ChevronDownIcon, ChevronUpIcon, EditIcon, HamburgerIcon} from "@chakra-ui/icons";
import {AuthContext} from '../context/index'
import {Link as ReactLink, useNavigate} from 'react-router-dom'
import {MdOutlineAccountCircle} from 'react-icons/md'
import {PiNotebookBold} from "react-icons/pi";

const LoginMenu = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate();
    const {setToken} = useContext(AuthContext)
    let userName = JSON.parse(localStorage.getItem('profileName'))?.first_name;
    let userLastName = JSON.parse(localStorage.getItem('profileName'))?.last_name;
    const colorSchemeWithValue = useColorModeValue('purple.500', 'orange.200')
    const colorText = useColorModeValue('white', 'black')

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

    // useEffect(() => {
    //     userName = JSON.parse(localStorage.getItem('profileName'))?.first_name;
    //     userLastName = JSON.parse(localStorage.getItem('profileName'))?.last_name;
    // }, [localStorage.key('profileName')]);

    return (
        <Box display={'flex'} w={'100%'} justifyContent={'flex-end'} maxH={10}>
            <ThemeToggleButton/>
            {isAuth &&
                <Menu borderRadius={'2em'}>
                    {({isOpen}) => (
                        <>
                            <MenuButton
                                as={Button}
                                _expanded={{bg: colorSchemeWithValue}}
                                _hover={{bg: colorSchemeWithValue}}
                                bg={colorSchemeWithValue}
                                color={colorText}
                                p={{base: '0', md: '16px'}}
                            >
                                {(userName) && (
                                    <Box display={{base: 'none', md: 'flex'}} alignItems={'flex-end'}>
                                        {userName + ' ' + userLastName}
                                        {isOpen ? <ChevronUpIcon/> : <ChevronDownIcon/>}
                                    </Box>
                                )}
                                <HamburgerIcon display={{base: 'flex', md: 'none'}} w={'100%'}/>
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title={'Навигация'} display={{base: 'flex', md: 'none'}}>
                                    <MenuItem
                                        as={ReactLink}
                                        w={'100%'}
                                        to={'/schedule'}
                                        icon={<CalendarIcon/>}
                                        display={{base: 'block', md: 'none'}}
                                    >
                                        Календарь
                                    </MenuItem>
                                    <MenuItem
                                        as={ReactLink}
                                        w={'100%'}
                                        to={'/taskList'}
                                        icon={<EditIcon/>}
                                        display={{base: 'block', md: 'none'}}
                                    >
                                        Задачи
                                    </MenuItem>
                                    <Divider w={'100%'} marginX={'auto'} display={{base: 'block', md: 'none'}}/>
                                </MenuGroup>
                                <MenuGroup title={'Профиль'} display={{base: 'flex', md: 'none'}}>
                                    <MenuItem
                                        as={ReactLink}
                                        icon={<MdOutlineAccountCircle/>}
                                        w={'100%'}
                                        to={'/profile'}
                                    >
                                        Личный кабинет
                                    </MenuItem>
                                    <MenuItem
                                        as={ReactLink}
                                        icon={<PiNotebookBold/>}
                                        w={'100%'}
                                        to={'/profile/homework'}
                                    >
                                        Домашние задания
                                    </MenuItem>
                                    <MenuItem
                                        as={'a'}
                                        key='1'
                                        onClick={disconnect}
                                        justifyContent={'center'}
                                    >
                                        Выйти
                                    </MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </>
                    )}
                </Menu>
            }

            {!isAuth &&
                <Link
                    as={ReactLink}
                    to={'/login'}
                    display={'block'}
                    bg={colorSchemeWithValue}
                    color={colorText}
                    pt={2} paddingX={4}
                    paddingY={2}
                    borderRadius={'.4em'}
                >
                    Войти
                </Link>
            }
        </Box>
    )
        ;
};

export default LoginMenu;