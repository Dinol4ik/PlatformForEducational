import React, {useEffect, useState} from 'react';
import {Link as ReactLink, useLocation, useParams} from "react-router-dom";
import LeftBarInProfile from "../Navigation/leftBarInProfile";
import {Box, Container, Grid, GridItem, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import Loader from "../Loader";
import AnimationLayout from "../AnimationLayout";
import LessonAPI from "../../API/lessonAPI";
import SomeLessonAPI from "../../API/Lessons/SomeLessonApi";
import axios from "axios";

const LessonsItem = () => {
    let marker = 0
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
        const date_plus_two = new Date(from.date_time)
        date_plus_two.setHours(date_plus_two.getHours()+2)
        const date_plus_two_format = date_plus_two.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})
        console.log(date_plus_two_format)
        const nowDate = new Date()
        const nowMonth = nowDate.toLocaleString('ru', {month: 'long', day: 'numeric'})
        const nowHour = nowDate.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})
        const month = date.toLocaleString('ru', {month: 'long', day: 'numeric'});
        const hour = date.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})
         // const date_plus_two = date.setHours(date.getHours()+2)
        // const date_plus_two1 = date_plus_two.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})
        chekOut()
function chekOut(){
            if (nowHour>date_plus_two_format && nowMonth < month){
                marker = 1
                console.log(marker)

            }
}
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
                                        <Box maxW={'400px'}>
                                        {from.video
                                            ? <video width="400" height="300" controls="controls" preload="auto"
                                                     controlsList="nodownload">
                                                <source src={from.video}/>
                                            </video>
                                            : nowHour >= hour&&nowHour<=date_plus_two_format && nowMonth >= month
                                                ? <Box maxW={'400px'}>
                                                    <iframe

                                                        src="https://player.twitch.tv/?channel=dinol_bot&parent=127.0.0.1&muted=true"
                                                        height="720"
                                                        width="1000"
                                                        allowFullScreen>
                                                    </iframe>
                                                </Box>
                                                : marker
                                                    ? <div>Стрим закончился!</div>
                                                    :<div>Стрим скоро начнется!</div>

                                        }</Box>

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
                                        : <div>
                                            <div>
                                                {from.video
                                                    ? <Link as={ReactLink} to={'/profile/homework'}>Домашнее задание</Link>
                                                    : <div>Домашнее задание появится после стрима!</div>
                                                }
                                            </div>
                                        </div>
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