import React from 'react';
import {Link as ReactLink} from "react-router-dom";
import {ArrowBackIcon, ArrowForwardIcon} from "@chakra-ui/icons";
import {Link, Text, useColorModeValue} from "@chakra-ui/react";

const NavigationLink = ({type, to, children, ...props}) => {
    const boxSizing = '25px'

    return (
        <Link
            as={ReactLink}
            to={to}
            display={'flex'}
            alignItems={'center'}
            paddingX={4}
            paddingY={2}
            mb={5}
            _hover={useColorModeValue('rgba(0, 0, 0, .5)', '#0c131c')}
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