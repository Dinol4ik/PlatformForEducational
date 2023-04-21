import React from 'react';
import {Box} from "@chakra-ui/react";

const MyModal = ({children, showModal, ...props}) => {
    return (
        <>
            {showModal && (
                <Box {...props}>
                    {children}
                </Box>
            )}
        </>
    )
};

export default MyModal;