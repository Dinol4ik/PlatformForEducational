import React from 'react';
import {motion, AnimatePresence} from "framer-motion";

const AnimationLayout = ({children, ...props}) => {
    const variants = {
        hidden: {
          y: -20,
          opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            }
        },
        exit: {
            y: -20,
            opacity: 0,
        }
    }

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default AnimationLayout;