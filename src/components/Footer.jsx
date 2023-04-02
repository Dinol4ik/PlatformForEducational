import React from 'react';
import {Link as ReactLink} from 'react-router-dom'
import {Box, Container, Flex} from "@chakra-ui/react";

const FooterItem = ({children, to, ...props}) => {
    return(
        <Box
            as={ReactLink}
            to={to}
            p={2}
            marginX={3}
            _hover={{bg: ''}}
            color={'whitesmoke'}
            textDecor={'underline'}
            {...props}
        >
            {children}
        </Box>
    )
}

const Footer = () => {
    return (
        <Container
            minW={'container.lg'}
            mb={2}
        >
            <Flex
                w={'100%'}
                align={'center'}
                justify={'flex-start'}
            >
                <Box
                    p={2}
                    marginX={3}
                    color={'lightgrey'}
                >
                    &copy; Все права принадлежат нам :)
                </Box>
                <FooterItem to={'/'}>Отзывы</FooterItem>
                <FooterItem to={'/'}>Акции</FooterItem>
                <Box
                    p={2}
                    marginX={3}
                    color={'lightgrey'}
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