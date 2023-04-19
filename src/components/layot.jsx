import React from 'react';
import {Outlet} from 'react-router-dom'
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Flex} from "@chakra-ui/react";
import {motion} from "framer-motion";

function Layot() {
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

export default Layot;