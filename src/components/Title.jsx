import React from 'react';
import {Text} from "@chakra-ui/react";

const Title = ({children}) => {
    return (
        <Text fontSize={'3xl'} fontWeight={'bold'}>
            {children}
        </Text>
    );
};

export default Title;