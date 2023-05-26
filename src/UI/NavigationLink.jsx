import React from 'react';
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {ArrowBackIcon, ArrowForwardIcon} from "@chakra-ui/icons";
import {Link, Text, useColorModeValue} from "@chakra-ui/react";

const NavigationLink = ({type, to, children, ...props}) => {
    const bgColor = useColorModeValue('rgba(0, 0, 0, .05)', '#0c131c')
    const boxSize = '25px'
    return (
        <Link
            as={ReactLink}
            to={to}
            display={'flex'} alignItems={'base-line'} paddingX={4} paddingY={2} w={'max-content'} mb={5}
            _hover={bgColor}
            {...props}
        >
            {type === 'back' &&
                <ArrowBackIcon boxSize={boxSize}/>}
            <Text as={'span'} fontSize={'md'} fontWeight={'semibold'}>
                {children}
            </Text>
            {type === 'forward' &&
                <ArrowForwardIcon boxSize={boxSize}/>}
        </Link>
    );
};

export default NavigationLink;