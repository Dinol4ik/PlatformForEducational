import React from 'react';
import {Badge, Box, Button, Flex, List, ListItem, Text} from "@chakra-ui/react";
import AddCurseInProfile from "../../API/AddCurseInProfile";
import {useNavigate} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";

const MyModal = ({showModal, post, ...props}) => {
    const courseTitle = post.title
    const courseAbout = post.about
    const courseInf = [...post.information.split('/')]
    const coursePrice = post.price
    const navigate = useNavigate()

    const modalVariants = {
        hidden: {
            opacity: 0,
            position: 'absolute',
            top: -10,
            width: '100%',
        },
        visible: {
            position: 'fixed',
            top: 0,
            left: 0,
            opacity: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            animate: {
                duration: 10,
                ease: 'easeInOut'
            }
        }
    }

    function buyCourse() {
        AddCurseInProfile.addCurse(localStorage.getItem('UserProfileId'), post.id)
        navigate('/profile')
    }

    return (
        <AnimatePresence mode={'wait'}>
            {showModal && (
                <motion.div
                    style={{
                        zIndex: 10,
                        height: '100vh'
                    }}
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    {...props}
                >
                    <Box
                        marginX={'auto'}
                        mt={'10%'}
                        w={'300px'}
                        h={'400px'}
                        p={5}
                        borderRadius={'10px'}
                        border={'1px solid black'}
                        bgColor={'red.100'}
                    >
                        <Flex flexDir={'column'} align={'center'} h={'100%'} fontSize={'md'} bgColor={'red.100'}>
                            <Text>
                                {courseTitle}
                            </Text>
                            <Text>
                                {courseAbout}
                            </Text>
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
                </motion.div>
            )}
        </AnimatePresence>
    )
};

export default MyModal;