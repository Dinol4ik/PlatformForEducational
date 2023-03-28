import React from 'react';
import ThemeToggleButton from "./ThemeToggleButton";
import {Box, Link, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {CalendarIcon, ChevronDownIcon} from "@chakra-ui/icons";

const LoginMenu = () => {
    return (
        <Box display={'flex'} w={'60%'} justifyContent={'flex-end'}>
            <ThemeToggleButton/>
            <Menu>
                <MenuButton>
                    Профиль
                    <ChevronDownIcon/>
                </MenuButton>
                <MenuList>
                    <MenuItem>
                        <Link href='/src/pages'>
                            Личный кабинет
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href='/src/pages'>
                            <Text>
                                Календарь
                                <CalendarIcon ml={5}/>
                            </Text>
                        </Link>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};

export default LoginMenu;