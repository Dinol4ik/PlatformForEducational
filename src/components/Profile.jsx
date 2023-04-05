import React from 'react';
import {Box, Container, Flex, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactLink} from 'react-router-dom'

const Profile = () => {
    return (
        <Container minW={'container.xl'} mt={20}>
            <Text fontSize={'4xl'} fontWeight={'semi-bold'}>Мои предметы</Text>
            <Flex>
                <Link as={ReactLink} to={'subject'}>
                    <Flex
                        align={'center'}
                        w={'300px'}
                        paddingX={10}
                        paddingY={6}
                        marginX={2}
                        borderRadius={'1em'}
                        bg={useColorModeValue('blackAlpha.700','#383838')}
                        color={'white'}
                    >
                        <Text fontSize={'xl'} m={0}>Математика</Text>
                        <Image
                            ml={8}
                            src="https://2.shkolkovo.online/images/subjects/1-white.svg"
                            alt={'тут была картинка'}></Image>
                    </Flex>
                </Link>
            </Flex>
        </Container>
    );
};

export default Profile;