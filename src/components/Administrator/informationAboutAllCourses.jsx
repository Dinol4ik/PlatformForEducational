import React from 'react';
import LaoutAdmin from "./laoutAdmin";
import {Box, Flex} from "@chakra-ui/react";

const InformationAboutAllCourses = () => {
    return (
        <div>
            <LaoutAdmin>
                <div>
                <Flex w={'100%'} justifyContent={'space-around'}  flexWrap={{sm: 'wrap', base: 'wrap'}}>
                <Box>
                    dddd
                </Box>
                <Box>
                    aaaa
                </Box>
                <Box>
                   eeee
                </Box>
                    </Flex>
                    </div>
            </LaoutAdmin>
        </div>
    );
};

export default InformationAboutAllCourses;