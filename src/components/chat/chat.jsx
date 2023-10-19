import React, {Suspense, useState} from 'react';
import {Box, Button, Flex, Input, Text, useColorModeValue} from "@chakra-ui/react";

const historyfirst = []

const Chat = ({socket}) => {
    const [messages, setMessages] = useState([]);
    const [history, setHistory] = useState([]);

    const bgColor = useColorModeValue('white', 'black')
    const borderColor = useColorModeValue(
        'var(--chakra-colors-purple-400)',
        'var(--chakra-colors-orange-300)'
    )

    if (socket) {
        localStorage.setItem("chat", socket)
        socket.onmessage = function (event) {
            if (history.length === 0 && JSON.parse(event.data).map) {
                JSON.parse(event.data).map(f => {
                    historyfirst.push(JSON.parse(f))
                })
                setHistory(historyfirst)
            } else setMessages([...messages, JSON.parse(JSON.parse(event.data))])
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const message = {
            user: JSON.parse(localStorage.getItem("profileName")).first_name,
            message: event.target.elements.message.value
        }
        event.target.elements.message.value = ''
        socket.send(JSON.stringify(message));
    };

    return (
        <Box minW={{base: '100%', md: '280px', lg: '340px'}} maxW={'340px'} bgColor={bgColor}
             minH={{base: '150', md: '400'}} maxH={{base: '250', md: 'none'}}
        >
            <Flex flexDir={'column'} h={'100%'} justifyContent={'space-between'}>
                {/*Тут выводятся последние 50 сообщений*/}
                <Flex flexDir={'column'} p={1} h={'100%'} overflowY={'scroll'}>
                    {(messages.length > 0 || history.length > 0 )
                        ?
                        <>
                            {history.map((e, index) =>
                                <Text key={index}>{e.user}: {e.message}</Text>
                            )}
                            {messages.map((el, index) =>
                                <Text key={index}>{el.user}: {el.message}</Text>
                            )}
                        </>
                        :
                        <Box>Добро пожаловать в чат!</Box>
                    }
                </Flex>
                <form onSubmit={handleSubmit}>
                    <Input type="text" name="message" placeholder='Введите сообщение' autoComplete="off"/>
                    <Button type={"submit"} float={'right'} m={1} mr={2}>Чат</Button>
                </form>
            </Flex>
        </Box>
    );


};

export default Chat;