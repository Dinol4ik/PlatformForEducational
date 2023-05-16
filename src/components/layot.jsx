import React from 'react';
import {Outlet} from 'react-router-dom'
import NavBar from "./Navigation/NavBar";
import Footer from "./Footer";
import {Flex, useColorModeValue} from "@chakra-ui/react";

function Layot() {
    return (
        <Flex
            flexDir={'column'}
            minH={'100vh'}
            bgColor={useColorModeValue('#ECF3F5', 'rgba(0, 0, 0, 0.2)')}
        >
            <NavBar/>
            <Outlet/>
            <Footer flex={1} display={'flex'}/>
        </Flex>
    );
}

export default Layot;