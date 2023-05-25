import React from 'react';
import {Alert, AlertIcon} from "@chakra-ui/react";

const MyAlert = ({status, text, ...props}) => {
    return (
        <Alert status={status} {...props}>
            <AlertIcon/>
            {text}
        </Alert>
    );
};

export default MyAlert;