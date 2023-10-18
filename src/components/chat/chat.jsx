import React, {Suspense, useState} from 'react';
import {Box, Button, Flex, Input, Text, useColorModeValue} from "@chakra-ui/react";
import SocketCon from "./ws";
import {useParams} from "react-router-dom";

const m = []

const Chat = () => {
    const paramsId = useParams()
    const id = paramsId.id
    const [messages, setMessages] = useState([]);
    const [socket, setConnection] = useState()

    const borderColor = useColorModeValue(
        'var(--chakra-colors-purple-400)',
        'var(--chakra-colors-orange-300)'
    )

    if (!socket) {
        setConnection(SocketCon.getSocket(id))
    }

    if (socket) {
        localStorage.setItem("chat", socket)
        socket.onmessage = function (event) {
            if (m.length === 0 && JSON.parse(event.data).map) {
                JSON.parse(event.data).map(f => {
                    m.push(JSON.parse(f))
                })
            } else setMessages([...messages, JSON.parse(JSON.parse(event.data))])
        };
    }

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        const message = {
            user: JSON.parse(localStorage.getItem("profileName")).first_name,
            message: event.target.elements.message.value
        }

        socket?.send(JSON.stringify(message));
    };

    return (
        <Box w={'340px'} textAlign={'center'} border={`2px solid ${borderColor}`} borderRadius={'8px'}>
            <Suspense fallback={<h2>Загрузка чата...</h2>}>
                {socket &&
                    <Flex flexDir={'column'} h={'100%'} justifyContent={'space-between'}>
                        {/*Тут выводятся последние 50 сообщений*/}
                        <Box textAlign={'center'} mx={'auto'}>
                            {m.length > 0 || messages.length > 0
                                ?
                                <>
                                    {m.map(e =>
                                        <Text>{e.user}:{e.message}</Text>
                                    )}
                                    {messages.map(val =>
                                        <Text>{val.user}:{val.message}</Text>
                                    )}
                                </>
                                :
                                <Box>Нет сообщений в чате</Box>
                            }
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Input type="text" name="message"/>
                            <Button type={"submit"}>Отправить</Button>
                        </form>
                    </Flex>
                }
            </Suspense>
        </Box>
    );


};

export default Chat;