import React, {useState} from 'react';
import MyModal from "../UI/ModalWindow/MyModal";
import {Box, Card, CardBody, CardHeader, Flex, Heading, useColorMode, useColorModeValue} from "@chakra-ui/react";
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
        <motion.div
            initial={{opacity: 0.4, y: '30'}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3, type: 'easeInOut'}}
        >
            <Box
                w={'100%'}
                maxW={'200px'}
                minH={'400px'}
            >
                <Flex flexDir={'column'} align={'center'} bgColor={useColorModeValue('purple.500', 'orange.200')}>
                    <Box>
                        {subjectTitle}
                    </Box>
                </Flex>
            </Box>
            {/*                */}
            {/* Модальное окно */}
            <MyModal showModal={active} setShowModal={setActive}>
                <Card p={0}>
                    <CardHeader marginX={2} mt={1} p={0}>
                        <Flex fontSize={'12px'} fontWeight={'500'} align={'base-line'}>
                            {props.post.title}
                        </Flex>
                    </CardHeader>
                    <CardBody paddingX={2} paddingY={1}>
                        {props.post.information.split('/').map((item, i) => {
                            return <div key={i}>{item}</div>
                        })}
                        <button onClick={getIdCurse}>КУПИТЬ</button>
                    </CardBody>
                </Card>
            </MyModal>
        </motion.div>
    );
};

export default PostItem;