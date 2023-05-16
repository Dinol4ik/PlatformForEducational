import React, {useEffect, useState} from 'react';
import CurseInProfile from "../../API/CurseInProfile";
import {Link} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import SolveTask from "../../API/TaskApi/SolveTask";

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
        console.log(homeWork.home_task)
        solveTask.map((v)=>{console.log(v.task.id);if (homeWork.home_task.includes(`${v.task.id}`)){
            trueCount++
            console.log(trueCount)
        }})
        if(trueCount === count){
            return <div>{value.subject.title}
            <div style={{margin: '10px',border:'1px solid green'}}>
                <Link as={ReactLink} to={`/homework/lesson/${homeWork.id}`}>{homeWork.title}</Link>
            </div>
        </div>
        }
        else return <div>{value.subject.title}
            <div style={{margin: '10px', border:'1px solid red'}}>
                <Link as={ReactLink} to={`/homework/lesson/${homeWork.id}`}>{homeWork.title}</Link>
            </div>
        </div>
    }

    return (
        <div>
            {lessons&&solveTask
                ? <div>
                    {lessons.curses.map((value) => {
                        return <div>
                            <div>{value.lessons.map(homeWork => {
                                return homeWork.home_task.length > 0
                                    ? <div>{needSolveTask(homeWork, value)}</div>
                                    : <div></div>
                            })}</div>
                        </div>
                    })}
                </div>
                : <div>Ожидание данных</div>
            }
        </div>
    );
};

export default HomeWork;