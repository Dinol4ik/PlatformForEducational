import React from 'react';
import {Link as ReactLink} from 'react-router-dom'
import {Box, Container, Flex, useColorModeValue} from "@chakra-ui/react";

const FooterItem = ({children, to, ...props}) => {
    return(
        <Box
            as={ReactLink}
            to={to}
            paddingY={2}
            paddingX={3}
            marginX={2}
            _hover={{bg: '#0399E9', color: 'white'}}
            color={useColorModeValue('grey', 'whitesmoke')}
            textDecor={'underline'}
            {...props}
        >
            {children}
        </Box>
    )
}

const Footer = (props) => {
    return (
        <Container
            alignItems={'flex-end'}
            minW={'container.lg'}
            mb={2}
            {...props}
        >
            <Flex
                w={'100%'}
                align={'center'}
                justify={'flex-start'}
            >
                <Box
                    p={2}
                    marginX={3}
                    color={useColorModeValue('grey', 'lightgrey')}
                >
                    &copy; Copyright
                </Box>
                <FooterItem to={'/'}>Отзывы</FooterItem>
                <FooterItem to={'/'}>Акции</FooterItem>
                <Box
                    p={2}
                    marginX={3}
                    color={useColorModeValue('grey', 'lightgrey')}
                    flex={1}
                    align="right"
                >
                    Связь с нами в вк:
                    <FooterItem
                        target="_blank"
                        to={'https://vk.com/3razmersisek'}
                    >
                        Андрей
                    </FooterItem>
                </Box>
            </Flex>
        </Container>
    );
};

export default Footer;