import React from 'react';
import {Badge, Box, Flex, ListItem, Text, UnorderedList, useColorModeValue} from "@chakra-ui/react";
import AddCurseInProfile from "../../API/AddCurseInProfile";
import {useNavigate} from "react-router-dom";

const MyModal = ({showModal, post, ...props}) => {
    const courseTitle = post.title
    const courseAbout = post.about
    const courseInf = [...post.information.split('/')]
    const coursePrice = post.price
    const navigate = useNavigate()

    const bgColor = useColorModeValue('white', '#383838')

    function buyCourse() {
        AddCurseInProfile.addCurse(localStorage.getItem('UserProfileId'), post.id)
        navigate('/profile')
    }

    return (
        <>
            {showModal && (
                <Box
                    pos={'fixed'} top={0} left={0} bgColor={'rgba(0, 0, 0, .7)'} w={'100%'} minH={'100vh'}
                    zIndex={100}
                    {...props}
                >
                    <Flex pos={'absolute'} top={'50%'} left={'50%'} transform={'translate(-50%, -50%)'}
                          flexDir={'column'} align={'center'} h={'100%'} fontSize={'md'} bgColor={bgColor}
                          maxH={'60vh'} w={'50vw'} p={5} borderRadius={'1em'}>
                        <Text fontSize={'xl'} fontWeight={'bold'}>
                            {courseTitle}
                        </Text>
                        <Text>
                            {courseAbout}
                        </Text>
                        <UnorderedList fontSize={'md'} w={'100%'} textAlign={'left'} m={0} paddingX={5} maxH={'150px'}
                                       overflowY={'hidden'} pos={'relative'} minH={'100px'} h={'100%'}>
                            {courseInf.map((value, index) =>
                                (value !== "") &&
                                <ListItem key={index}>{value}</ListItem>
                            )}
                        </UnorderedList>
                        <Box flex={1} display={'flex'} alignItems={'flex-end'} w={'100%'}>
                            <Flex flexDir={'column'} w={'100%'}>
                                <Text>
                                    Цена: <Badge colorScheme={'green'} fontSize={'md'}>{coursePrice}</Badge>
                                </Text>
                                <Box
                                    marginX={'auto'}
                                    cursor={'pointer'}
                                    p={'.75em 2em'}
                                    bgColor={'blue.300'}
                                    onClick={buyCourse}
                                >
                                    Купить
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            )}
        </>
    )
};

export default MyModal;