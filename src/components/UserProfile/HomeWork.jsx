import React, {useEffect, useState} from 'react';
import CurseInProfile from "../../API/CurseInProfile";
import {Box, Container, Grid, GridItem, Link, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import SolveTask from "../../API/TaskApi/SolveTask";
import Loader from "../Loader";
import Title from "../Title";
import AnimationLayout from "../AnimationLayout";

const HomeWorkItem = ({borderColor, value, homeWork}) => {
    return (
        <>
            <Link
                p={4}
                border={`.1rem dashed ${borderColor}`}
                borderRadius={'1em'}
                display={'block'}
                _hover={{textDecoration: 'none'}}
                as={ReactLink}
                to={`/homework/lesson/${homeWork.id}`}
            >
                <Text mb={1} fontWeight={'semibold'} display={'inline-block'}>
                    Предмет: &nbsp;
                    <Text textDecor={'underline'} display={'inline-block'} mb={1}>
                        {value.subject.title}
                    </Text>
                </Text>
                <Text m={0} fontWeight={'semibold'}>Урок: &nbsp; &nbsp; {homeWork.title}</Text>
            </Link>
        </>
    )
}

const HomeWork = () => {
    const [lessons, setLessons] = useState()
    const [solveTask, setSolveTask] = useState()
    useEffect(() => {
        fetchHomeWork()
        fetchSolveTask()
    }, [])

    async function fetchHomeWork() {
        const homeWork = await CurseInProfile.getInfoAboutCurseInProfiel()
        setLessons(homeWork)
    }

    async function fetchSolveTask() {
        const solvedTask = await SolveTask.getAllSolveTask(localStorage.getItem('UserProfileId'))
        setSolveTask(solvedTask)
    }

    function needSolveTask(homeWork, value) {
        let count = homeWork.home_task.length
        let trueCount = 0
        solveTask.map((v) => {
            console.log(v.task.id);
            if (homeWork.home_task.includes(`${v.task.id}`)) {
                trueCount++
                console.log(trueCount)
            }
        })
        if (trueCount === count)
            return <HomeWorkItem value={value} homeWork={homeWork} borderColor={'green'}/>
        else
            return <HomeWorkItem value={value} homeWork={homeWork} borderColor={'red'}/>
    }

    return (
        <AnimationLayout>
            <Container maxW={'7xl'}>
                <Title>Домашние задания</Title>
                {lessons && solveTask
                    ? <Grid templateColumns={'repeat(auto-fit, minmax(300px, 1fr))'} gap={'1.5em'}>
                        {lessons.curses.map((value) => {
                            return <>{value.lessons.map(homeWork => {
                                return (homeWork.home_task.length > 0 &&
                                    <GridItem>
                                        {console.log(value.lessons)}
                                        {needSolveTask(homeWork, value)}
                                    </GridItem>)
                            })}</>
                        })}
                    </Grid>
                    : <Loader/>
                }
            </Container>
        </AnimationLayout>
    );
};

export default HomeWork;