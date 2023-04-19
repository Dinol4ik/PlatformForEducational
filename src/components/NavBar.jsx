import React from 'react';
import {
    Container,
    Link,
    Box,
    Stack,
    Heading,
} from '@chakra-ui/react'
import LoginMenu from "../UI/LoginMenu";
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
        <Container
            as={'nav'}
            css={{backdropFilter: 'blur(10px)'}}
            display="flex"
            p={2}
            w={'100%'}
            maxW="container.lg"
            wrap="wrap"
            align="center"
            justify="center"
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
                mt={0}
            >
                <LinkItem as={ReactLink} to="/schedule">Календарь</LinkItem>
                <LoginMenu/>
            </Stack>
        </Container>
    );
};

export default NavBar