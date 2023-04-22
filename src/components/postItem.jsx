import React, {useState} from 'react';
import MyModal from "../UI/ModalWindow/MyModal";
import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    List, ListItem,
    Text,
    useColorMode,
    useColorModeValue
} from "@chakra-ui/react";
import AddCurseInProfile from "../API/AddCurseInProfile";
import {AnimatePresence, motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
    const [active, setActive] = useState(false)
    const subjectTitle = props.post.subject.title
    const courseTitle = props.post.title
    const courseAbout = props.post.about
    const courseInf = [...props.post.information.split('/')]
    const coursePrice = props.post.price

    function modalView() {
        setActive(true)
    }

    return (
        <Box pos={'relative'}>
            <motion.div>
                <Box
                    display={active ? 'none' : 'block'}
                    overflowY={'hidden'}
                    w={'100%'}
                    maxW={'300px'}
                    marginX={'auto'}
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
            <MyModal
                showModal={active}
                post={props.post}
                border={active ? '1px solid black' : 'none'}
                onClick={() => {
                    setActive(false)
                }}
            />
        </Box>
    )
};

export default PostItem;