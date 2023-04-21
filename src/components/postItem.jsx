import React, {useState} from 'react';
import MyModal from "../UI/ModalWindow/MyModal";
import {Box, Card, CardBody, CardHeader, Flex, Heading, Text, useColorMode, useColorModeValue} from "@chakra-ui/react";
import AddCurseInProfile from "../API/AddCurseInProfile";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
    const [active, setActive] = useState(false)
    const navigate = useNavigate()
    const subjectTitle = props.post.subject.title
    const courseTitle = props.post.title
    const courseAbout = props.post.about
    const coursePrice = props.post.price

    function modalView() {
        setActive(true)
    }

    function getIdCurse() {
        AddCurseInProfile.addCurse(localStorage.getItem('UserProfileId'), props.post.id)
        navigate('/profile')
    }

    return (
        <Box pos={'relative'}>
            <motion.div
                // whileHover={{scale: 1.1,}}
            >
                <Box
                    display={active ? 'none' : 'block'}
                    overflowY={'hidden'}
                    w={'100%'}
                    maxW={'300px'}
                    p={5}
                    onClick={modalView}
                    h={'400px'}
                    bgColor={useColorModeValue('purple.600', 'orange.300')}
                    color={useColorModeValue('white', 'black')}
                    borderRadius={10}
                >
                    <Flex
                        flexDir={'column'}
                        align={'center'}
                        minH={'100%'}
                    >
                        <Text fontSize={'md'}>
                            {subjectTitle}
                        </Text>
                        <Text fontSize={'xl'}>
                            {courseTitle}
                        </Text>
                        <Box>
                            {courseAbout}
                        </Box>
                        <Box flex={1} display={'flex'} alignItems={'flex-end'}>
                            <Text>Нажмите, чтобы узнать больше</Text>
                        </Box>
                    </Flex>
                </Box>
            </motion.div>
            {/*                */}
            {/* Модальное окно */}
            <Box
                pos={'absolute'}
                top={0}
                left={0}
                bottom={0}
                onClick={() => {
                    setActive(false)
                }}
                border={active ? '1px solid black' : 'none'}
                borderRadius={'10px'}
            >
                <MyModal showModal={active}>
                    <Box p={0}>
                        <Box marginX={2} mt={1} p={0}>
                            <Flex fontSize={'12px'} fontWeight={'500'} align={'base-line'}>
                                {props.post.title}
                            </Flex>
                        </Box>
                        <Box paddingX={2} paddingY={1}>
                            {props.post.information.split('/').map((item, i) => {
                                return <div key={i}>{item}</div>
                            })}
                            <button onClick={getIdCurse}>КУПИТЬ</button>
                        </Box>
                    </Box>
                </MyModal>
            </Box>
        </Box>
    )
};

export default PostItem;