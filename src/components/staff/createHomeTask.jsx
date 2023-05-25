import React, {useEffect, useState} from 'react';
import AllUsersInCourse from "../../API/Lessons/homeWork/AllUsersInCourse";
import {redirect, useLocation} from "react-router-dom";
import CreateHomeWork from "../../API/Lessons/homeWork/CreateHomeWork";
import AnimationLayout from "../AnimationLayout";
import {
    Box,
    Button,
    Container,
    Divider,
    Flex,
    Grid,
    GridItem,
    Image,
    ListItem,
    Text,
    UnorderedList,
    useColorModeValue
} from "@chakra-ui/react";
import Loader from "../Loader";
import MyAlert from "../Alert";

const CreateHomeTask = () => {
    const id = useLocation()
    const bgColor = useColorModeValue('rgba(255, 255, 255, .8)', 'black')
    const [homeTaskInfo, setHomeTaskInfo] = useState({
        "title": id.state.lesson_title,
        "date_time": id.state.lesson_date_time,
        "id": id.state.lesson_id
    })
    const [homeTaskId, setHomeTaskId] = useState([])
    const [user, setUsers] = useState()
    const [homeWork, setHomeWork] = useState()

    useEffect(() => {
        fetchUsersForHomeWork()
    }, [])

    async function fetchUsersForHomeWork() {
        const result = await AllUsersInCourse.getUsersInCurse(id.state.course_id)
        const homeWork = await AllUsersInCourse.getTaskForHomeWork()
        setUsers(result)
        setHomeWork(homeWork)
    }

    function selectTask(event) {
        console.log(event.target)
        if (!homeTaskId.includes(event.target.id) && event.target.id !== '') {
            setHomeTaskId([...homeTaskId, event.target.id])
        }
    }

    async function sendHomeWork(event) {
        if (homeTaskId.length > 0) {
            const send = await CreateHomeWork.getSomeLessonsInCurse(homeTaskInfo, homeTaskId)
            redirect('/')
            console.log(send)
        } else {
            <MyAlert status={'error'} text={'Вы не добавили задания!'} pos={'fixed'} zIndex={1000} bottom={0} left={0}
                     right={0}/>
        }
    }

    return (
        <AnimationLayout>
            {user
                ? <Flex flexDir={'column'}>
                    {/*<Text fontSize={{md: 'xl', base: 'md'}}>*/}
                    {/*    Пользователи у которых куплен курс*/}
                    {/*</Text>*/}
                    {/*<Flex>*/}
                    {/*    {user.map((t) => <Box>{t.profile.name}</Box>)}*/}
                    {/*</Flex>*/}
                    <Divider/>
                    <Grid
                        templateColumns={'1fr 2fr'}
                        templateAreas={`"text1 text2"
                                        "box1 box2"`}
                        gap={4}
                        h={'65vh'}
                    >
                        <GridItem area={'text1'} fontSize={'2xl'} fontWeight={'semibold'}>
                            Выбранные задачи
                        </GridItem>
                        <GridItem area={'box1'} overflowY={'scroll'}>
                            <UnorderedList>
                                {homeTaskId.map(value => (
                                    <ListItem>{value}</ListItem>
                                ))}
                            </UnorderedList>
                        </GridItem>
                        <GridItem area={'text2'} fontSize={'2xl'} fontWeight={'semibold'}>
                            Все задачи
                        </GridItem>
                        <GridItem area={'box2'} overflowY={'scroll'} maxH={'100%'} paddingX={4}
                                  style={{scrollSnapType: 'y mandatory'}}>
                            {homeWork && <>
                                {homeWork.map((value, index) => {
                                    return <Grid
                                        key={index}
                                        templateAreas={`"img title"
                                                        "img button"`}
                                        p={4} m={4} gap={4}
                                        bgColor={bgColor}
                                        minH={'300px'}
                                        boxShadow={'xl'}
                                        borderRadius={'1em'}
                                        style={{scrollSnapAlign: 'center'}}
                                        onClick={selectTask}
                                    >
                                        <GridItem area={'title'}>
                                            <Text>{value.title}</Text>
                                        </GridItem>
                                        {value.img_task &&
                                            <GridItem area={'img'}>
                                                <Image boxSize={'250px'} src={value.img_task}
                                                       alt={'тут была картинка'}/>
                                            </GridItem>
                                        }
                                        <GridItem
                                            area={'button'}
                                            h={'100%'}
                                            display={'flex'}
                                            justifyContent={'center'}
                                            alignItems={'flex-end'}
                                        >
                                            <Button id={value.id}>Добавить задачу</Button>
                                        </GridItem>
                                    </Grid>
                                })}
                            </>
                            }
                        </GridItem>
                    </Grid>
                    <Box textAlign={'center'} fontWeight={'bold'} mt={6}>
                        <Button onClick={sendHomeWork} fontSize={'2xl'}>Отправить</Button>
                    </Box>
                </Flex>
                : <Loader/>
            }
        </AnimationLayout>
    );
};

export default CreateHomeTask;