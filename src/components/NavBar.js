import React from 'react';
import {
    Container,
    Link,
    Box,
    Stack,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react'
import LoginMenu from "./UI/LoginMenu";

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  return (
    <Link
      href={href}
      p={2}
      bg={active ? 'grassTeal' : undefined}
      color={active ? '#202023' : inactiveColor}
      target={target}
      {...props}
    >
      {children}
    </Link>
  )
}

const NavBar = () => {
    return (
        <Container
            display="flex"
            p={2}
            maxW="container.md"
            wrap="wrap"
            align="center"
            justify="space-between"
            >
                <Box as='h1' mr='20px'>
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                        Не школково
                    </Heading>
                </Box>
                <Stack direction='row'
                       display='flex'
                       width='auto'
                       alignItems="center"
                       flexGrow={1}
                       mt={0}
                >
                    <LinkItem href='/'>
                        Купить курсы
                    </LinkItem>
                    <LinkItem href='/'>
                        Акции
                    </LinkItem>
                    <LoginMenu/>
                </Stack>
        </Container>
    );
};

export default NavBar;