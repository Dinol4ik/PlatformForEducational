import React, {useContext, useState} from 'react';
import {Box, Container, Heading, Link, Stack, useColorModeValue,} from '@chakra-ui/react'
import LoginMenu from "../../UI/LoginMenu";
import {Link as ReactLink} from "react-router-dom"
import {AuthContext} from "../../context";

const LinkItem = ({to, children, ...props}) => {
    return (
        <Link
            as={ReactLink}
            minW={'max-content'}
            to={to}
            p={2}
            _hover={{color: '#0399e9'}}
            {...props}
        >
            {children}
        </Link>
    )
}

const NavBar = () => {

    return (
        <Box
            pos={'fixed'}
            top={0} left={0} right={0}
            bgColor={useColorModeValue('#dce3e699', '#0c131c99')}
            maxW={'100%'}
            h={'max-content'}
            css={{backdropFilter: 'blur(10px)'}}
            zIndex={100}>
            <Container
                as={'nav'}
                display="flex"
                p={2}
                w={'100%'}
                wrap="wrap"
                align="center"
                justify="center"
                maxW={'6xl'}
            >
                <Box as='h1' mr={10}>
                    <Heading as={ReactLink} to={'/'}>Наш сайт</Heading>
                </Box>
                <Stack
                    direction='row'
                    display='flex'
                    width='auto'
                    alignItems="center"
                    flexGrow={1}
                    mt={0}
                >
                    <LinkItem as={ReactLink} to="/schedule" display={{base: 'none', md: 'block'}}>Календарь</LinkItem>
                    <LinkItem as={ReactLink} to={'/taskList'} display={{base: 'none', md: 'block'}}>Задачи</LinkItem>
                    <LoginMenu/>
                </Stack>
            </Container>
        </Box>
    );
};

export default NavBar