import React from 'react';
import {Box, Flex, Link, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";

const LeftBarInProfile = (props) => {
    const borderColor = useColorModeValue('black', 'white')
    const bgColor = useColorModeValue('rgba(0, 0, 0, .05)', '#0c131c')
    const boxShadow = useColorModeValue('', '0 0 2px whitesmoke')

    const LinkItem = ({title, ...props}) => {
        return (
            <Link
                as={ReactLink}
                to={'/'}
                p={4}
                _hover={{bg: '#0399E9', color: 'white'}}
                {...props}
            >
                {title}
            </Link>
        )
    }
    return (
        <Box
            h={'max-content'}
            pos={'sticky'} top={'6em'}
            borderRadius={'1em'}
            bgColor={bgColor}
            boxShadow={boxShadow}
            overflow={'hidden'}
            w={'max-content'}
            minW={'200px'}
        >
            <Flex
                flexDir={'column'}
                align={'left'}
            >
                <LinkItem to={'/admin'} title={props.select_one}/>
                <LinkItem to={'/admin/information'} title={props.select_two}/>
                <LinkItem to={'/admin/reload-chat'} title={props.select_three}/>
            </Flex>
        </Box>
    );
};

export default LeftBarInProfile;