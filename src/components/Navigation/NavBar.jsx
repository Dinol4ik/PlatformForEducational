import React from 'react';
import {
    Container,
    Link,
    Box,
    Stack,
    Heading, useColorModeValue,
} from '@chakra-ui/react'
import LoginMenu from "../../UI/LoginMenu";
import {Link as ReactLink} from "react-router-dom"

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
             top={0} left={0} right={0}
            bgColor={useColorModeValue('#dce3e6', '#0c131c')}
            maxW={'100%'}
            h={'max-content'}
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
                    <Heading as={ReactLink} to={'/'} letterSpacing={'tighter'}>Наш сайт</Heading>
                </Box>
                <Stack
                    direction='row'
                    display='flex'
                    width='auto'
                    alignItems="center"
                    flexGrow={1}
                    mt={0}>
                    <LinkItem as={ReactLink} to="/schedule">Календарь</LinkItem>
                    <LinkItem as={ReactLink} to={'/taskList'}>Задачи</LinkItem>
                    <LoginMenu/>
                </Stack>
            </Container>
        </Box>
    );
};

export default NavBar