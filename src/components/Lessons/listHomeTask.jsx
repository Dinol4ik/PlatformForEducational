import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SomeLessonAPI from "../../API/Lessons/SomeLessonApi";
import TaskApi from "../../API/TaskApi/TaskApi";
import TaskItem from "../Task/TaskItem";
import axios from "axios";
import TaskInTheme from "../../API/TaskApi/TaskInTheme";
import SolveTask from "../../API/TaskApi/SolveTask";

const ListHomeTask = () => {
    const [homeTask, setHomeTask] = useState()
    const [allTask, setAllTask] = useState()
    const idLesson = useParams()
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
        <div>
            {homeTask && allTask
                ? <div>{allTask.map((value, id) => {
                    return <div>
                        {homeTask.home_task.includes(`${value.id}`)&&
                             <div>
                               <div className='task-list'>
                            <div className='task'>
                                <div>
                                    <span style={{marginRight: '30px'}}>{id}</span> {value.title}
                                </div>
                                <div>
                                    <img src={value.img_task}/>
                                    <form onSubmit={submit}>
                                        <input type='hidden' name="idTask" value={value.id}/>
                                        <input type="text" name='answer'/>
                                        {result && analysTask(value.id)}
                                    </form>
                                </div>
                            </div>
                        </div>
                            </div>
                            }
                    </div>
                })}</div>
                : <div>чего то нет</div>
            }
        </div>
    );
};

export default ListHomeTask;