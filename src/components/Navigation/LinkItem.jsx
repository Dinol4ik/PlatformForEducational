import React from 'react';
import {Link} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";

const LinkItem = ({title, ...props}) => {
    return (
        <Link
            as={ReactLink}
            to={'/'}
            paddingX={4}
            paddingY={3}
            _hover={{bg: '#0399E9', color: 'white'}}
            {...props}
        >
            {title}
        </Link>
    );
};

export default LinkItem;