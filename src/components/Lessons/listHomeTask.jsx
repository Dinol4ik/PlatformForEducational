import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SomeLessonAPI from "../../API/Lessons/SomeLessonApi";
import TaskApi from "../../API/TaskApi/TaskApi";
import TaskItem from "../Task/TaskItem";
import axios from "axios";
import TaskInTheme from "../../API/TaskApi/TaskInTheme";
import SolveTask from "../../API/TaskApi/SolveTask";
import AnimationLayout from "../AnimationLayout";
import Loader from "../Loader";
import {Box, Button, Grid, GridItem, Image, Input, Text, useColorModeValue} from "@chakra-ui/react";

const ListHomeTask = () => {
    const [homeTask, setHomeTask] = useState()
    const [allTask, setAllTask] = useState()
    const idLesson = useParams()
    const borderColor = useColorModeValue('black', 'white')
    const bgColor = useColorModeValue('white', 'black') //#1f1f1f

    useEffect(() => {
        fetchSolveTask()
        fetchSomeLessons()
    }, [])

    async function fetchSomeLessons() {
        const lesson = await SomeLessonAPI.getSomeLessonsInCurse(idLesson.id);
        setHomeTask(lesson)
        const task = await TaskApi.getAllTask()
        setAllTask(task)
    }

    const [solve, setSolve] = useState()
    const [result, setResult] = useState()

    async function fetchSolveTask() {
        const result = await SolveTask.getAllSolveTask(localStorage.getItem('UserProfileId'))
        setResult(result)
        console.log('nawat')
    }

    function submit(event) {
        const res = axios.post('http://127.0.0.1:8000/analys', {
            "answer": event.target.answer.value,
            "idTask": event.target.idTask.value,
            "idProfile": localStorage.getItem('UserProfileId')
        })
        res.then(t => {
            console.log(t.data)
            setSolve(t.data)
        })

        event.preventDefault()
    }

    function h() {
        setTimeout(fetchSolveTask, 100)
    }

    function analysTask(id) {
        if (solve) {
            if (solve['id'] === id) {
                console.log(id)
                return <>
                    <button style={{backgroundColor: solve['color']}}>Отправить</button>
                    {solve['res']}</>
            }
        }
        let sovpalo = 0
        result.map(e => {
            if (e.task['id'] === id) {
                sovpalo = 1
            }
        })
        if (sovpalo) {
            return <Button bgColor={'green'} color={'white'}>Отправить</Button>
        } else return <Button onClick={h}>Отправить</Button>
    }

    return (
        <AnimationLayout>
            {homeTask && allTask
                ? <>
                    {allTask.map((val, id) => {
                        return <Box key={id}>
                            {homeTask.home_task.includes(`${val.id}`) &&
                                <Grid
                                    key={id + 1000}
                                    marginX={'auto'} mb={10} p={5}
                                    bgColor={bgColor}
                                    maxW={'3xl'}
                                    templateAreas={`"img title"
                                                    "img answer"`}>
                                    <GridItem area={'title'}>
                                        <Text>{val.title}</Text>
                                    </GridItem>
                                    <GridItem area={'img'} display={'flex'} justifyContent={'center'}>
                                        {val.img_task &&
                                            <Image src={val.img_task} boxSize={'250px'} alt={'картинка'}/>
                                        }
                                    </GridItem>
                                    <GridItem area={'answer'} display={'flex'} alignItems={'flex-end'} minW={'100%'}>
                                        <form onSubmit={submit} style={{width: '100%', display: 'flex'}}>
                                            <Input type='hidden' name="idTask" value={val.id}/>
                                            <Input type="text" name='answer' w={'50%'} mr={5}
                                                   border={'1px solid ' + borderColor}/>
                                            {result && analysTask(val.id)}
                                        </form>
                                    </GridItem>
                                </Grid>
                            }
                        </Box>
                    })}</>
                : <Loader/>
            }
        </AnimationLayout>
    );
};

export default ListHomeTask;