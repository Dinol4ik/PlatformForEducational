import React, {useEffect, useState} from 'react';
import {Badge, Box, Flex, ListItem, Text, UnorderedList, useColorModeValue} from "@chakra-ui/react";
import AddCurseInProfile from "../../API/AddCurseInProfile";
import {useNavigate} from "react-router-dom";
import AllUsersInCourse from "../../API/Lessons/homeWork/AllUsersInCourse";
import login from "../../components/login";

const MyModal = ({showModal, post, ...props}) => {
        const courseTitle = post.title
        const courseAbout = post.about
        const [user,setUser] = useState([])

        const courseInf = [...post.information.split('/')]
        const coursePrice = post.price
        const navigate = useNavigate()
        const bgButtonBuy = useColorModeValue('purple.400', 'orange.200')
        const colorButtonBuy = useColorModeValue('white', 'black')

        const bgColor = useColorModeValue('white', '#383838')
        const adress = window.location.href.indexOf('admin')


        function buyCourse() {
            AddCurseInProfile.addCurse(localStorage.getItem('UserProfileId'), post.id)
            navigate('/profile')
        }
            // props.user.then(value=>{if (value.length>0)setUser(value)})

////// admin-modal
        if (adress !== -1) {

            return (
                <>
                    {showModal && (
                        <Box
                            pos={'fixed'} top={0} left={0} bgColor={'rgba(0, 0, 0, .7)'} w={'100%'} minH={'100vh'}
                            zIndex={100}
                            {...props}
                        >
                            <Flex pos={'absolute'} top={'50%'} left={'50%'} transform={'translate(-50%, -50%)'}
                                  flexDir={'initial'} justifyContent={'center'} align={'center'} h={'100%'}
                                  fontSize={'md'} bgColor={bgColor}
                                  maxH={'60vh'} w={'50vw'} p={5} borderRadius={'1em'}>
                                <div>
                                    <Text fontSize={'xl'} fontWeight={'bold'}>
                                    Пользователи в курсе
                                </Text>
                                    <UnorderedList fontSize={'md'} w={'100%'} textAlign={'left'} m={0} paddingX={5}
                                                   maxH={'150px'}
                                                   overflowY={'hidden'} pos={'relative'} minH={'100px'} h={'100%'}>
                                        {user&&user.map((val)=>{return<ListItem>{val.profile.name}</ListItem>})}
                                        {/*{courseInf.map((value, index) =>*/}
                                        {/*    (value !== "") &&*/}
                                        {/*    <ListItem key={index}>{value}</ListItem>*/}
                                        {/*)}*/}
                                    </UnorderedList></div>
                                <div>

                                    <UnorderedList fontSize={'md'} w={'100%'} textAlign={'left'} m={0} paddingX={5}
                                                   maxH={'150px'}
                                                   overflowY={'hidden'} pos={'relative'} minH={'100px'} h={'100%'}>

                                        {/*{user.then(value =>value[0]&&<ListItem key={value[0].profile.id}>{value[0].profile.name}</ListItem>)}*/}
                                        {/*{user.then(value => { console.log('asdasd')*/}
                                        {/*   value[0].length>0&&<ListItem key={value[0].id}>{value[0].profile.name}</ListItem>*/}
                                        {/*})}*/}


                                    </UnorderedList></div>
                            </Flex>

                        </Box>
                    )}
                </>
            )
        }
        ////////////////////////
        else {
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
                                <UnorderedList fontSize={'md'} w={'100%'} textAlign={'left'} m={0} paddingX={5}
                                               maxH={'150px'}
                                               overflowY={'hidden'} pos={'relative'} minH={'100px'} h={'100%'}>
                                    {courseInf.map((value, index) =>
                                        (value !== "") &&
                                        <ListItem key={index}>{value}</ListItem>
                                    )}
                                </UnorderedList>
                                <Box flex={1} display={'flex'} alignItems={'flex-end'} w={'100%'}>
                                    <Flex flexDir={'column'} w={'100%'}>
                                        <Text>
                                            Ценdsaа: <Badge colorScheme={'green'} fontSize={'md'}>{coursePrice}</Badge>
                                        </Text>
                                        <Box
                                            marginX={'auto'}
                                            cursor={'pointer'}
                                            p={'.75em 2em'}
                                            bgColor={bgButtonBuy}
                                            color={colorButtonBuy}
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
        }


    }
;

export default MyModal;