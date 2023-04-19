import React from 'react';
import {SpinnerIcon} from "@chakra-ui/icons";
import {Flex} from "@chakra-ui/react";
import {motion} from "framer-motion";

const LoadingIcon = () => {
    return (
        <Flex align={'center'} justify={'center'}>
            <motion.div
                animate={{rotateZ: 360}}
                transition={{delay: 10}}
            >
                <SpinnerIcon boxSizing={10}/>
            </motion.div>
        </Flex>
    );
};

export default LoadingIcon;