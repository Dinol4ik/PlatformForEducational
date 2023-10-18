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
            bgColor={'rgba(0, 0, 0, .1)'}
            _hover={{backgroundColor: 'rgba(0, 0, 0, .25)'}}
            px={3} py={2}
            borderRadius={'8px'}
            mb={2}
            w={'max-content'}
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