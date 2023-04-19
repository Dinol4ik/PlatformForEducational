import React from 'react';
import {motion} from "framer-motion";

const AnimationLayout = ({children, ...props}) => {
    return (
        <motion.div
            initial={{y: -20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: 20, opacity: 0}}
            transition={{duration: 0.4}}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default AnimationLayout;