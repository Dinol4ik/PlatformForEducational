import React from 'react';
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {Box, IconButton, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {AnimatePresence, motion} from 'framer-motion';

const ThemeToggleButton = () => {
    const {toggleColorMode} = useColorMode()

    return (
        <Box>
            <AnimatePresence mode={'wait'} initial={false}>
                <motion.div
                    mode='wait'
                    style={{display: 'block'}}
                    key={useColorModeValue('light', 'dark')}
                    initial={{y: -20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: 20, opacity: 0}}
                    transition={{duration: 0.2}}
                >
                    <IconButton
                        colorScheme={useColorModeValue('purple', 'orange')}
                        aria-label='theme'
                        icon={useColorModeValue(<MoonIcon boxSizing={3}/>, <SunIcon boxSizing={3}/>)}
                        mr={4}
                        onClick={toggleColorMode}
                    />
                </motion.div>
            </AnimatePresence>
        </Box>
    );
};

export default ThemeToggleButton;