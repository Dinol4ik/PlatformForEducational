import React from 'react';
import {Flex, Spinner} from "@chakra-ui/react";

const Loader = ({...props}) => {
    return (
        <Flex align={'center'} justify={'center'} {...props}>
            <Spinner size='xl' />
        </Flex>
    );
};

export default Loader;