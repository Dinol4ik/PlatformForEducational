import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TaskInTheme from "../../API/TaskApi/TaskInTheme";
import axios from "axios";
import SolveTask from "../../API/TaskApi/SolveTask";
import {Box, Container, Divider, Flex, Grid, GridItem, Image, Input, Text, useColorModeValue} from "@chakra-ui/react";
import AnimationLayout from "../AnimationLayout";

const TaskItem = () => {
    const [solve, setSolve] = useState()
    const idThem = useParams()
    const [task, setTask] = useState()
    const [result, setResult] = useState()
    const bgColor = useColorModeValue('white', 'black') //#1f1f1f
    const borderColor = useColorModeValue('black', 'rgba(255, 255, 255, .4)')

    useEffect(() => {
        fetchTask()
        fetchSolveTask()
    }, [])

    async function fetchTask() {
        const res = await TaskInTheme.getAllTask(idThem.id)
        setTask(res)
    }

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
            if (solve['id'] == id) {
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
            return <button style={{backgroundColor: "green"}}>Отправить</button>
        } else return <button onClick={h}>Отправить</button>
    }

    return (
        <AnimationLayout>
            <Container maxW={'container.lg'}>
                <Flex flexDir={'column'} marginY={10}>
                    {task
                        ? task.theme.map((val, index) => (
                            <Box bgColor={bgColor} marginX={20} mb={10} p={5}>
                                <Text fontWeight={'bold'}>
                                    Задача №{index + 1}
                                </Text>
                                <Grid templateAreas={`"img title"
                                                    "img answer"`}
                                >
                                    <GridItem area={'title'}>
                                        {val.title}
                                    </GridItem>
                                    <GridItem area={'img'} display={'flex'} justifyContent={'center'}>
                                        <Image src={val.img_task} boxSize={'250px'} alt={'картинка'}/>
                                    </GridItem>
                                    <GridItem area={'answer'} display={'flex'} alignItems={'flex-end'} minW={'100%'}>
                                        <form onSubmit={submit} style={{width: '100%'}}>
                                            <input type='hidden' name="idTask" value={val.id}/>
                                            <Input type="text" name='answer' w={'50%'} mr={5}
                                                   border={'1px solid ' + borderColor}/>
                                            {result && analysTask(val.id)}
                                        </form>
                                    </GridItem>
                                </Grid>
                            </Box>))
                        : <div>Подгрузка</div>
                    }
                </Flex>
            </Container>
        </AnimationLayout>
    );
};

export default TaskItem;