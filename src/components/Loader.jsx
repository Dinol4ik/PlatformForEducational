import React from 'react';
import {SpinnerIcon} from "@chakra-ui/icons";
import {Flex} from "@chakra-ui/react";
import {motion} from "framer-motion";

const loaderVariants = {
    animation: {
        rotateZ: 360,
        transition: {
            repeat: Infinity,
            duration: 1,
        }
    }
}

const Loader = ({...props}) => {
    return (
        <Flex align={'center'} justify={'center'} {...props}>
            <motion.div
                variants={loaderVariants}
                animate="animation"
            >
                <SpinnerIcon boxSize={10}/>
            </motion.div>
        </Flex>
    );
};

export default Loader;