import React, {useEffect, useState} from 'react';
import {Link as ReactLink, useLocation, useParams} from "react-router-dom";
import {Box, Container, Flex, Grid, GridItem, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import Loader from "../Loader";
import AnimationLayout from "../AnimationLayout";
import SomeLessonAPI from "../../API/Lessons/SomeLessonApi";
import LinkItem from "../Navigation/LinkItem";
import {TimeIcon, UnlockIcon} from "@chakra-ui/icons";
import NavigationLink from "../../UI/NavigationLink";
import LessonsApi from "../../API/Lessons/LessonsApi";

const LessonsItem = () => {
    let marker = 0
    const [userInCourse, setUserInCourse] = useState()
    const bgColor = useColorModeValue('rgba(0, 0, 0, .05)', '#0c131c')
    const boxShadow = useColorModeValue('', '0 0 2px whitesmoke')
    const [is_staff, setStaff] = useState(JSON.parse(localStorage.getItem("profileName")).is_staff)
    const params = useParams()
    const [from, setFrom] = useState()
    useEffect((lesson) => {
        fetchSomeLessons()
        chekUser(params.idCourse)
    }, [])

    async function chekUser(id_course) {
        const result = await LessonsApi.checkUserInCourse(id_course)
        setUserInCourse(result)
    }

    async function fetchSomeLessons() {
        const lesson = await SomeLessonAPI.getSomeLessonsInCurse(params.id);
        setFrom(lesson)
    }

    console.log(userInCourse)

    const borderColor = useColorModeValue('black', 'white')
    if (from) {
        const date = new Date(from.date_time)
        const date_plus_two = new Date(from.date_time)
        date_plus_two.setHours(date_plus_two.getHours() + 2)
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

        function chekOut() {
            if (nowHour > date_plus_two_format && nowMonth < month) {
                marker = 1
                console.log(marker)

            }
        }

        console.log()
        return (
            <AnimationLayout>
                <NavigationLink
                    to={'/profile/subject/' + params.idSubject + "/" + params.idCourse}
                    type={'back'}>
                    К выбору уроков
                </NavigationLink>
                <Grid templateColumns='250px 1fr' gap={6}>
                    <GridItem
                        h={'max-content'}
                        pos={'sticky'} top={'6em'}
                        borderRadius={'1em'}
                        bgColor={bgColor}
                        boxShadow={boxShadow}
                        overflow={'hidden'}
                    >
                        <Flex flexDir={'column'} align={'left'}>
                            <LinkItem as={ReactLink} to={'/'} title={'Видео уроки'}/>
                            <LinkItem as={ReactLink} to={'/profile/homework'} title={'Домашние задания'}/>
                            <LinkItem as={ReactLink} to={'/taskList'} title={'Каталог задач'}/>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        {
                            userInCourse['result'] === 'true'
                                ? from
                                    ? <>
                                        <Text m={0}>
                                            Тема урока: <Text as={'span'} fontWeight={'semibold'}>{from.title}</Text>
                                        </Text>
                                        <Text m={0}>
                                            Дата урока: <Text as={'span'} fontWeight={'semibold'}>{month}</Text>
                                        </Text>
                                        <Text>
                                            Время урока: <Text as={'span'} fontWeight={'semibold'}>{hour}</Text>
                                        </Text>
                                        <Box maxW={'400px'}>
                                            {from.video
                                                ? <video width="400" height="300" controls="controls" preload="auto"
                                                         controlsList="nodownload">
                                                    <source src={from.video}/>
                                                </video>
                                                : (nowHour >= hour && nowHour <= date_plus_two_format && nowMonth >= month)
                                                    ? <Box maxW={'400px'}>
                                                        <iframe
                                                            src="https://player.twitch.tv/?channel=dinol_bot&parent=127.0.0.1&muted=true"
                                                            height="720"
                                                            width="1000"
                                                            allowFullScreen>
                                                        </iframe>
                                                    </Box>
                                                    : marker
                                                        ? <Box>Стрим закончился!</Box>
                                                        : <Box>Стрим скоро начнется!</Box>

                                            }
                                        </Box>
                                        {is_staff === true
                                            ? <Link
                                                display={'flex'}
                                                alignItems={'baseline'}
                                                as={ReactLink}
                                                state={{
                                                    'course_id': from['curse'].id,
                                                    'lesson_id': from.id,
                                                    'lesson_title': from.title,
                                                    'lesson_date_time': from.date_time,
                                                }}
                                                to={'/create/homeTask'}
                                            >
                                                <UnlockIcon display={'inline'} boxSize={'12px'} mr={1}/>
                                                <Text display={'inline'}>Открыть генератор заданий</Text>
                                            </Link>
                                            : <div>
                                                <div>
                                                    {from.video
                                                        ? <Link as={ReactLink} to={'/profile/homework'}>Домашнее
                                                            задание</Link>
                                                        : <div>Домашнее задание появится после стрима!</div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </>
                                    :
                                    <Loader/>
                                : <div style={{textAlign: "center"}}>
                                    <h1>Отсутсвует подписка на курс</h1>
                                    <Link as={ReactLink} to='/' style={{
                                        'border': 'none',
                                        'outline': 'none',
                                        'font-family': 'Open Sans, sans-serif',
                                        'display': 'inline-block',
                                        'font-weight': '600',
                                        'color': 'rgb(255, 255, 255)',
                                        ' font-size': '16px',
                                        'line-height': '20px',
                                        'padding': '22px',
                                        'text-decoration': 'none',
                                        'text-align': 'center',
                                        'background': 'var(--accent,#0399E9)',
                                        'border-radius': '3px',
                                        'cursor': 'pointer',
                                        'transition': 'background 0.2s linear 0s',
                                                    //hover {
                                        //     background: rgb(9, 166, 251);
                                        // }
                                    }}> Купить</Link>
                                </div>
                        }
                    </GridItem>
                </Grid>
            </AnimationLayout>
        );
    } else return <Loader/>
};

export default LessonsItem;