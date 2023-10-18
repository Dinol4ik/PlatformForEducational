import React, {Suspense, useEffect, useMemo, useState} from 'react';
import {Link as ReactLink, useParams} from "react-router-dom";
import {Box, Button, Flex, FormControl, FormLabel, Input, Link, Text, useColorModeValue} from "@chakra-ui/react";
import Loader from "../Loader";
import SomeLessonAPI from "../../API/Lessons/SomeLessonApi";
import {UnlockIcon} from "@chakra-ui/icons";
import LessonsApi from "../../API/Lessons/LessonsApi";
import Start_end_stream from "../../API/Lessons/Start_end_stream";
import Chat from "../chat/chat";
import Video from "./Video";
import TwitchPlayer from "./TwitchPlayer";

async function checkUser(id_course) {
    return await LessonsApi.checkUserInCourse(id_course)
}

async function fetchSomeLessons(id) {
    return await SomeLessonAPI.getSomeLessonsInCurse(id);
}

const LessonsItem = () => {
    const params = useParams()

    const [textButton, setTextButton] = useState('')
    const [status, setStatus] = useState('')
    const [userInCourse, setUserInCourse] = useState([])
    const [is_staff] = useState(JSON.parse(localStorage.getItem("profileName")).is_staff)
    const [from, setFrom] = useState()

    const bgColorLink = useColorModeValue('purple.500', 'orange.200')
    const colorLink = useColorModeValue('white', 'black')
    const colorScheme = useColorModeValue('purple', 'orange')

    useEffect(() => {
        checkUser(params.idCourse)
            .then(res => setUserInCourse(res))

        fetchSomeLessons(params.id)
            .then(lesson => {
                setFrom(lesson)
                setStatus(lesson.stream_status)
                if (status === "offline") {
                    setTextButton('Начать трансляцию')
                } else if (status === "end") {
                    setTextButton('Трансляция закончилась')
                } else {
                    setTextButton('Закончить трансляцию')
                }
            })
    }, [])

    function submitVideo(event) {
        console.log(event.target[0].files[0])
        const video = event.target[0].files[0]
        const update_video = Start_end_stream.loadVideo(from, video)
        update_video.then(e => console.log(e))
        event.preventDefault()
    }

    async function streamStatus(stream) {
        if (stream.target.id === 1) {
            setTextButton('Завершить трансляцию')
            setStatus('online')
            await Start_end_stream.getSomeLessonsInCurse(from, status)
            stream.target.id = 2
        } else {
            setTextButton('Трансляция закончилась')
            setStatus('end')
            await Start_end_stream.getSomeLessonsInCurse(from, status)
            stream.target.id = 1
        }
    }

    const date = new Date(from?.date_time)
    const month = date.toLocaleString('ru', {month: 'long', day: 'numeric'});
    const hour = date.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})

    return (
        <Flex minH={'70vh'} flexDir={'column'}>
            {userInCourse['result'] === 'true'
                ?
                from &&
                <>
                    <Text>
                        <Text as={'span'} fontWeight={'semibold'}>Урок:</Text> {from?.title}. {month} {hour}
                    </Text>
                    <>
                        {status && status === 'online' &&
                            <TwitchPlayer
                                src={"https://player.twitch.tv/?channel=dinol_bot&parent=localhost&muted=true"}/>
                        }
                        {status && status === 'end' &&
                            <Text>Стрим закончился!</Text>
                        }
                        {from?.video && status &&
                            <Video src={from.video}/>
                        }
                        {status && status !== 'online' && status !== 'end' &&
                            <Text>Стрим скоро начнется!</Text>
                        }
                    </>
                    {/* Если разработчик, то выложить ДЗ */}
                    <Box flex={1} display={'flex'} alignItems={'flex-end'} mt={3}>
                        {is_staff &&
                            <Flex flexDir={'column'} gap={3} mb={2}>
                                <Link
                                    as={ReactLink}
                                    state={{
                                        'course_id': from['curse'].id,
                                        'lesson_id': from.id,
                                        'lesson_title': from.title,
                                        'lesson_date_time': from.date_time,
                                    }}
                                    to={'/create/homeTask'}
                                    bgColor={'rgba(0, 0, 0, .1)'}
                                    _hover={{backgroundColor: 'rgba(0, 0, 0, .25)'}}
                                    px={3} py={2}
                                    borderRadius={'8px'}
                                >
                                    <UnlockIcon display={'inline'} boxSize={'12px'} mr={1}/>
                                    Открыть генератор заданий
                                </Link>
                                <Button
                                    id={textButton === 'Начать трансляцию' ? 1 : 2}
                                    onClick={streamStatus}
                                    colorScheme={colorScheme}
                                >
                                    {textButton}
                                </Button>
                            </Flex>
                        }
                        {/* Если разработчик, и трансляция закончилась, то выложить видео */}
                        {is_staff && status === 'end' &&
                            <FormControl border={'1px solid black'} w={'100%'} maxW={'350px'} borderRadius={'1em'}
                                         p={2} as='fieldset'>
                                <FormLabel as='legend'>
                                    Загрузить файл с видео
                                </FormLabel>
                                <form
                                    onSubmit={submitVideo}
                                    encType="multipart/form-data"
                                >
                                    <Input type="file" accept="video/*" size='sm' placeholder='Filled' mb={2}/>
                                    <Button type="submit" colorScheme={colorScheme} size='sm'>
                                        Загрузить видео
                                    </Button>
                                </form>
                            </FormControl>
                        }
                        {/* Если не разраб, получить дз */}
                        {from?.video &&
                            <Text>
                                Домашние задания скоро появятся в вашем профиле
                                <Link as={ReactLink} to={'/profile/homework'}>Перейти</Link>
                            </Text>
                        }
                    </Box>
                </>
                :
                // Отсутсвует подписка на курс
                <Box textAlign={'center'} minH={'100px'} h={'100%'}>
                    <Text fontSize={'2xl'} mb={6}>
                        Отсутсвует подписка на курс
                    </Text>
                    <Link as={ReactLink} to='/' borderRadius='3px' fontSize='16px' px={8} py={4}
                          bgColor={bgColorLink} color={colorLink}>
                        Купить
                    </Link>
                </Box>
            }
        </Flex>
    );
};

export default LessonsItem;