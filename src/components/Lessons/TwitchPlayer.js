import React from 'react';
import Chat from "../chat/chat";
import {AspectRatio, Flex} from "@chakra-ui/react";

const TwitchPlayer = ({src}) => {
    return (
        <Flex w={'100%'} h={'100%'} justifyContent={'space-between'} gap={1}>
            <AspectRatio
                ratio={16 / 9}
                w={'100%'}
                maxW={'850px'}
                display={'flex'}
                justifyContent={'center'}
                mx={'auto'}
            >
                <iframe
                    title={'player'}
                    src={src}
                    allowFullScreen>
                </iframe>
            </AspectRatio>
            <Chat/>
        </Flex>
    );
};

export default TwitchPlayer;