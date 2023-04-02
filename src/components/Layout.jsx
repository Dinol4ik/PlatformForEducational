import React from 'react';
import {Link, Outlet} from 'react-router-dom'
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Box, Flex} from "@chakra-ui/react";
function Layout(props) {
    return (
        <Flex
            flexDir={'column'}
            minH={'100vh'}
        >
            <NavBar/>

            <Outlet/>

            <Footer flex={1} display={'flex'}/>
        </Flex>
    );
}

export default Layout;