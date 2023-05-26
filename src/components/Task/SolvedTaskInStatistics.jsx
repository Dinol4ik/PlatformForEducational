import React, {useEffect, useState} from 'react';
import SolveTask from "../../API/TaskApi/SolveTask";
import axios from "axios";
import Loader from "../Loader";
import {Box, Button, Grid, GridItem, Image, Input, Text, useColorModeValue} from "@chakra-ui/react";
import AnimationLayout from "../AnimationLayout";

const SolvedTaskInStatistics = () => {
    const [solve, setSolve] = useState()
    const [result, setResult] = useState()
    const bgColor = useColorModeValue('white', 'black') //#1f1f1f
    const borderColor = useColorModeValue('black', 'rgba(255, 255, 255, .4)')
    useEffect(() => {
        fetchSolveTask()
    }, [])


    async function fetchSolveTask() {
        const result = await SolveTask.getAllSolveTask(localStorage.getItem('UserProfileId'))
        setResult(result)
        console.log(result)
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
            return <Button bgColor={'green'} color={'white'}>Ответ верный</Button>
        } else return <Button onClick={h}>Отправить</Button>
    }

    return (
        <AnimationLayout>
            {result
                ? result.map(val =>
                    <Box bgColor={bgColor} marginX={20} mb={10} p={5}>
                        <Grid templateAreas={`"img title"
                                                    "img answer"`}
                        >
                            <GridItem area={'title'}>
                                {val.task.title}
                            </GridItem>
                            <GridItem area={'img'} display={'flex'} justifyContent={'center'}>
                                {val.task.img_task &&
                                    <Image src={val.task.img_task} boxSize={'250px'} alt={'картинка'}/>
                                }

                            </GridItem>
                            <GridItem area={'answer'} display={'flex'} alignItems={'flex-end'} minW={'100%'}>
                                <form onSubmit={submit} style={{width: '100%'}}>
                                    <Input type='hidden' name="idTask" value={val.task.id}/>
                                    <Input type="text" name='answer' w={'50%'} mr={5}
                                           border={'1px solid ' + borderColor}/>
                                    {result &&
                                        analysTask(val.task.id)}
                                </form>
                            </GridItem>
                        </Grid>
                    </Box>)
                : <Loader/>
            }
        </AnimationLayout>
    );
};


export default SolvedTaskInStatistics;