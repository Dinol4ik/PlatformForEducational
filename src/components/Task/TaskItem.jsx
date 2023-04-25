import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TaskInTheme from "../../API/TaskApi/TaskInTheme";
import axios from "axios";
import SolveTask from "../../API/TaskApi/SolveTask";
import AnimationLayout from "../AnimationLayout";
import Loader from "../Loader";
import {Box, Container, Divider, Flex, Image, useColorModeValue} from "@chakra-ui/react";

const TaskItem = () => {
    const idThem = useParams()
    const [task, setTask] = useState()
    const [result, setResult] = useState()
    const colorScheme = useColorModeValue('telegram', 'whiteAlpha')

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
            if (t.data.answer === 'true') {

            }
        })
        event.preventDefault()
    }

    function h() {
        setTimeout(fetchSolveTask, 100)
    }

    function analysTask(id) {
        let sovpalo = 0
        result['test'].map(e => {
            if (e.task_id === id) {
                sovpalo = 1
            }
        })
        if (sovpalo) {
            return <button style={{backgroundColor: "green"}}>Отправить</button>
        } else return <button onClick={h}>Отправить</button>
    }

    return (
        <AnimationLayout>
            <Container maxW={'container.xl'} mt={10}>
                {
                    task
                        ?
                        task.theme.map(val =>
                            <Flex justify={'center'} key={val.id} w={800} marginX={'auto'}>
                                <Flex flexDir={'column'} align={'center'} key={val.id} w={'100%'}>
                                    <div>
                                        {val.title}
                                    </div>
                                    <Flex flexDir={'column'} w={'100%'}>
                                        <Box
                                            boxSize='md'
                                            display={'flex'}
                                            justifyContent={'center'}
                                            w={'100%'}
                                            h={'min-content'}
                                        >
                                            <Image src={val.imgTask}/>
                                        </Box>
                                        <form
                                            style={{display: 'flex', justifyContent: 'center'}}
                                            onSubmit={submit}
                                        >
                                            <input type='hidden' name="idTask" value={val.id}/>
                                            <input type="text" name='answer'/>
                                            {result && analysTask(val.id)}
                                        </form>
                                        <Divider marginY={10} w={'100%'} marginX={'auto'} borderColor={colorScheme}/>
                                    </Flex>
                                </Flex>
                            </Flex>)
                        :
                        <Loader/>
                }
            </Container>
        </AnimationLayout>
    );
};

export default TaskItem;