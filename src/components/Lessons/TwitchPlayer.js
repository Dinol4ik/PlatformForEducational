import React, {useState} from 'react';
import Chat from "../chat/chat";
import {AspectRatio, Flex, useColorModeValue} from "@chakra-ui/react";
import SocketCon from "../chat/ws";
import {useParams} from "react-router-dom";

const TwitchPlayer = ({src}) => {
    const [socket, setConnection] = useState()
    const params = useParams()
    const id = params.id

    const borderColor = useColorModeValue(
        'var(--chakra-colors-purple-400)',
        'var(--chakra-colors-orange-300)'
    )

    if (!socket) {
        setConnection(SocketCon.getSocket(id))
    }

    return (
        <Flex w={'100%'} justifyContent={'space-between'} flexDir={{base: 'column', md: 'row'}}
              border={`2px solid ${borderColor}`} borderRadius={'8px'} bgColor={'black'} overflow={'hidden'}
              maxH={{base: '100%', md: '500'}}
        >
            <AspectRatio
                ratio={16/9}
                maxW={'1000px'}
                mx={'auto'}
                w={'100%'}
            >
                <iframe
                    title={'player'}
                    src={src}
                    // allowFullScreen
                ></iframe>
            </AspectRatio>
            <Chat socket={socket}/>
        </Flex>
    );
};

export default TwitchPlayer;