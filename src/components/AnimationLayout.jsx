import React from 'react';
import {motion} from "framer-motion";
import {Container} from "@chakra-ui/react";

const AnimationLayout = ({children, ...props}) => {
    const variants = {
        hidden: {
            y: 20,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeInOut",
            }
        },
        exit: {
            y: 20,
            opacity: 0,
        }
    }

    return (
        <motion.div
            style={{marginTop: '6em'}}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            {...props}
        >
            <Container maxW={{...props.width?"100%":'6xl'}} p={'8px'}>
                {children}
            </Container>
        </motion.div>
    );
};

export default AnimationLayout;