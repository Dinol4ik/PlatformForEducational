import React, {useEffect, useState} from 'react';
import {Link as ReactLink, useLocation, useParams} from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Image,
    Input,
    Link,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import Loader from "../Loader";
import AnimationLayout from "../AnimationLayout";
import SomeLessonAPI from "../../API/Lessons/SomeLessonApi";
import LinkItem from "../Navigation/LinkItem";
import {TimeIcon, UnlockIcon} from "@chakra-ui/icons";
import NavigationLink from "../../UI/NavigationLink";
import LessonsApi from "../../API/Lessons/LessonsApi";
import axios from "axios";
import Start_end_stream from "../../API/Lessons/Start_end_stream";
import Chat from "../chat/chat";
import SubjectLayout from "./SubjectLayout";

const LessonsItem = () => {
    const [textButton, setTextButton] = useState('')
    const [status, setStatus] = useState('')
    const [userInCourse, setUserInCourse] = useState([])
    const bgColor = useColorModeValue('rgba(0, 0, 0, .05)', '#0c131c')
    const boxShadow = useColorModeValue('', '0 0 2px whitesmoke')
    const [is_staff, setStaff] = useState(JSON.parse(localStorage.getItem("profileName")).is_staff)
    const params = useParams()
    const [from, setFrom] = useState()
    useEffect(() => {
        fetchSomeLessons()
    }, [])
    useEffect(() => {
        chekUser(params.idCourse)
    }, [])

    async function chekUser(id_course) {
        const result = await LessonsApi.checkUserInCourse(id_course)
        setUserInCourse(result)
    }


    async function fetchSomeLessons() {
        const lesson = await SomeLessonAPI.getSomeLessonsInCurse(params.id);
        setFrom(lesson)
        setStatus(lesson.stream_status)
        if (lesson.stream_status == "offline") {
            setTextButton('Начать трансляцию')

        } else if (lesson.stream_status == "end") {
            setTextButton('Трансляция закончилась')
        } else {
            setTextButton('Закончить трансляцию')
        }
    }

    function submitVideo(event) {
        console.log(event.target[0].files[0])
        const video = event.target[0].files[0]
        const update_video = Start_end_stream.loadVideo(from, video)
        update_video.then(e => console.log(e))
        event.preventDefault()
    }

    async function streamStatus(stream) {
        if (stream.target.id == 1) {
            setTextButton('Завершить трансляцию')
            const status = "online"
            const update_status = await Start_end_stream.getSomeLessonsInCurse(from, status)
            setStatus('online')
            console.log(status)
            stream.target.id = 2
        } else {
            setTextButton('Трансляция закончилась')
            const status = "end"
            const update_status = await Start_end_stream.getSomeLessonsInCurse(from, status)
            setStatus('end')
            stream.target.id = 1
        }
    }

    if (from) {
        const date = new Date(from.date_time)
        // const date_plus_two = new Date(from.date_time)
        // date_plus_two.setHours(date_plus_two.getHours() + 2)
        // const date_plus_two_format = date_plus_two.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})
        // const nowDate = new Date()
        // const nowMonth = nowDate.toLocaleString('ru', {month: 'long', day: 'numeric'})
        // const nowHour = nowDate.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})
        const month = date.toLocaleString('ru', {month: 'long', day: 'numeric'});
        const hour = date.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})
        // const date_plus_two = date.setHours(date.getHours()+2)
        // const date_plus_two1 = date_plus_two.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})
        return (
            <AnimationLayout>
                <NavigationLink
                    to={'/profile/subject/' + params.idSubject + "/" + params.idCourse}
                    type={'back'}>
                    К выбору уроков
                </NavigationLink>
                <SubjectLayout>
                    {userInCourse['result'] === 'true'
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
                                    <Box>

                                        {from.video && status
                                            ? <div>
                                                <video width="400" height="300" controls="controls" preload="auto"
                                                       controlsList="nodownload">
                                                    <source src={from.video}/>
                                                </video>
                                            </div>
                                            : status && status === 'online'
                                                ? <Box style={{height: "50%", display: "flex"}}>
                                                    {console.log(status)}
                                                    <iframe style={{position: 'relative'}}
                                                            src="https://player.twitch.tv/?channel=dinol_bot&parent=localhost&muted=true"
                                                            height="300px"
                                                            width="50%"
                                                            allowFullScreen>
                                                    </iframe>
                                                    <div><Chat/></div>
                                                </Box>
                                                : (status && status === 'end')
                                                    ? <Box>Стрим закончился! {console.log(status)}</Box>
                                                    : <Box>Стрим скоро начнется! {console.log(status)}</Box>

                                        }
                                    </Box>
                                    {is_staff === true
                                        ? <><Link
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
                                            <Button id={textButton == 'Начать трансляцию' ? 1 : 2}
                                                    onClick={streamStatus}>{textButton}</Button>
                                            {textButton == "Трансляция закончилась" &&
                                                <form onSubmit={submitVideo} enctype="multipart/form-data">
                                                    <Input type="file" accept="video/*"/>
                                                    <Button type="submit">Загрузить видео</Button>
                                                </form>}
                                        </>

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
                </SubjectLayout>
            </AnimationLayout>
        );
    } else return <Loader/>
};

export default LessonsItem;