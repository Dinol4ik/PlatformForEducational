import React from 'react';
import {Flex, Link, Text} from "@chakra-ui/react";
import {Link as ReactLink} from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <Flex
            h={'400px'}
            w={'100%'}
            align={'center'}
            justify={'center'}
            flexDir={'column'}
        >
            <Text fontSize={'5xl'}>Page Not Found :(</Text>
            <Link fontSize={'3xl'} as={ReactLink} to={'/'}>На главную</Link>
        </Flex>
    );
};

export default NotFoundPage;