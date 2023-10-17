import React from 'react';
import {Link as ReactLink} from "react-router-dom";
import {ArrowBackIcon, ArrowForwardIcon} from "@chakra-ui/icons";
import {Link, Text, useColorModeValue} from "@chakra-ui/react";

const NavigationLink = ({type, to, children, ...props}) => {
    const boxSizing = '25px'
    const hoverColor = useColorModeValue('rgba(255, 255, 255, .5)', '#0c131c')

    return (
        <Link
            as={ReactLink}
            to={to}
            display={'flex'}
            alignItems={'center'}
            paddingX={4}
            paddingY={2}
            mb={5}
            w={'max-content'}
            _hover={hoverColor}
            {...props}
        >
            {type === 'back' &&
                <ArrowBackIcon boxSizing={boxSizing}/>}
            <Text as={'span'} fontSize={'md'}>
                {children}
            </Text>
            {type === 'forward' &&
                <ArrowForwardIcon boxSizing={boxSizing}/>}
        </Link>
    );
};

export default NavigationLink;