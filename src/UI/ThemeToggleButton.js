import React from 'react';
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {IconButton, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {AnimatePresence, motion} from 'framer-motion';

const ThemeToggleButton = () => {
    const { toggleColorMode } = useColorMode()

    return (
        <AnimatePresence initial={false}>
            <motion.div
                style={{ display: 'inline-block' }}
                initial={{ translateY: -20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <IconButton
                    colorScheme={useColorModeValue('purple', 'orange')}
                    aria-label='theme'
                    icon={useColorModeValue(<SunIcon boxSizing={3} />, <MoonIcon boxSizing={3} />)}
                    mr={4}
                    onClick={toggleColorMode} />
            </motion.div>
        </AnimatePresence>
    );
};

export default ThemeToggleButton;