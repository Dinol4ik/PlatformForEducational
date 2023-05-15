import React, {useEffect, useState} from 'react';
import {Link as ReactLink, useLocation, useParams} from "react-router-dom";
import LeftBarInProfile from "../Navigation/leftBarInProfile";
import {Box, Container, Grid, GridItem, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import Loader from "../Loader";
import AnimationLayout from "../AnimationLayout";
import LessonAPI from "../../API/lessonAPI";
import SomeLessonAPI from "../../API/Lessons/SomeLessonApi";

const LessonsItem = () => {
    const [is_staff, setStaff] = useState(JSON.parse(localStorage.getItem("profileName")).is_staff)
    const idLesson = useParams()
    const [from, setFrom] = useState()
    useEffect((lesson) => {
        fetchSomeLessons()
    }, [])

    async function fetchSomeLessons() {
        const lesson = await SomeLessonAPI.getSomeLessonsInCurse(idLesson.id);
        setFrom(lesson)
    }

    const borderColor = useColorModeValue('black', 'white')
    if (from) {

        const date = new Date(from.date_time)
        const month = date.toLocaleString('ru', {month: 'long', day: 'numeric'});
        const hour = date.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})
        return (
            <AnimationLayout>
                <Container
                    mt={10}
                    minW={'100%'}
                    minH={'100%'}
                >

                    <Grid
                        h={'100%'}
                        minH={'600px'}
                        templateColumns='250px 1fr'
                        gap={10}
                        mt={4}
                        borderTop={'1px solid ' + borderColor.toString()}
                    >
                        <LeftBarInProfile/>

                        <GridItem mt={4}>
                            {from
                                ? <>
                                    {console.log(from)}
                                    <Text fontSize={'md'}>
                                        Тема урока:
                                        <Box as={'span'} ml={'1em'} fontWeight={'semibold'}>
                                            {from.title}
                                        </Box>
                                        <div>
                                            Дата урока:
                                            <Box as={'span'} ml={'1em'} fontWeight={'semibold'}>
                                                {month}
                                            </Box>
                                        </div>
                                        <div>
                                            Время урока:
                                            <Box as={'span'} ml={'1em'} fontWeight={'semibold'}>
                                                {hour}
                                            </Box>
                                        </div>
                                    </Text>
                                    <Grid
                                        templateColumns={'repeat(auto-fit, minmax(300px, 1fr))'}
                                        gap={20}
                                        mr={50}
                                        ml={10}
                                        mb={25}
                                    >
                                        <video width="400" height="300" controls="controls">
                                            <source src={from.video}/>
                                        </video>
                                    </Grid>
                                    {is_staff === true
                                        ? <Link as={ReactLink} state={{
                                            'course_id': from['curse'].id,
                                            'lesson_id': from.id,
                                            'lesson_title': from.title,
                                            'lesson_date_time': from.date_time,
                                        }} to={'/create/homeTask'}>
                                            <div>Открыть генератор заданий</div>
                                        </Link>
                                        : <div>Домашнее задание:</div>
                                    }
                                </>
                                :
                                <Loader/>
                            }
                        </GridItem>
                    </Grid>
                </Container>
            </AnimationLayout>
        );
    } else return <Loader/>

};

export default LessonsItem;