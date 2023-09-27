import React, {useEffect, useState} from 'react';
import LaoutAdmin from "./laoutAdmin";
import {Badge, Box, Button, Flex, Grid, Heading, Text} from "@chakra-ui/react";
import Loader from "../Loader";
import AnimationLayout from "../AnimationLayout";
import LessonAPI from "../../API/lessonAPI";
import CalendarDay from "../Calendar/CalendarDay";
import MostHaveCourseApi from "../../API/AdminApi/MostHaveCourseApi";
import login from "../login";

const LessonsListForAdmin = () => {
    const [lessons, setLessons] = useState()
    useEffect(() => {
        fetchLessons()
    }, [])

    async function fetchLessons() {
        const lesson = await LessonAPI.getAll();
        setLessons(lesson)
    }

    function sendLessonsId() {
        const lessonsId = []
        lessons.map(e => {
                lessonsId.push(`${e.id}`)

            }
        )

const sendLesson = MostHaveCourseApi.sendLessons(lessonsId)
    }

    return (
        <AnimationLayout>
            <LaoutAdmin>
                {lessons
                    ?
                    <>
                        <Flex
                            w={{base: 'max-content', md: '100%'}}
                            flexDir={{base: 'column', md: 'row'}}
                            justify={{md: 'space-around'}}
                            gap={5}
                            paddingX={5}
                        >
                            {lessons.map(val => <Box>
                                <Text fontWeight={'semibold'} fontSize={'md'}>{val.title}</Text>
                                <Box border={'2px solid lime'} p={5} borderRadius={'1em'}>
                                    <Text fontSize={'xl'}>{val.stream_status}</Text>
                                    <Text fontSize={'xs'} fontWeight={'semibold'}>
                                        Предмет: &nbsp;
                                        <Box display={'inline'}>{val.curse.title}</Box>
                                    </Text>
                                    <Text mb={0}>Цена: {lessons.title}</Text>
                                </Box>
                            </Box>)}
                        </Flex>
                        <Button onClick={sendLessonsId}>Обновить чаты</Button>
                    </>
                    : <Loader/>
                }
            </LaoutAdmin>
        </AnimationLayout>
    );
};

export default LessonsListForAdmin;