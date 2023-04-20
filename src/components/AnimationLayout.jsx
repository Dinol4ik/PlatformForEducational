import React from 'react';
import {motion} from "framer-motion";

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
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default AnimationLayout;