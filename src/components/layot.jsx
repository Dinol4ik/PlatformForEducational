import React from 'react';
import {Outlet} from 'react-router-dom'
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Flex, useColorModeValue} from "@chakra-ui/react";

function Layot() {
    return (
        <Flex
            flexDir={'column'}
            minH={'100vh'}
            bgColor={useColorModeValue('#fcfaed' , '')}
        >
            <NavBar/>
            <Outlet/>
            <Footer flex={1} display={'flex'}/>
        </Flex>
    );
}

export default Layot;