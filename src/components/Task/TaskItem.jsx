import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TaskInTheme from "../../API/TaskApi/TaskInTheme";
import axios from "axios";
import SolveTask from "../../API/TaskApi/SolveTask";

const TaskItem = () => {
    const [solve, setSolve] = useState()
    const idThem = useParams()
    const [task, setTask] = useState()
    const [result, setResult] = useState()
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
        <div>
            {
                task
                    ? task.theme.map(val =>
                        <div className='task-list'>
                            <div className='task'>
                                <div>
                                    {val.title}
                                </div>
                                <div>
                                    <img src={val.imgTask}/>
                                    <form onSubmit={submit}>
                                        <input type='hidden' name="idTask" value={val.id}/>
                                        <input type="text" name='answer'/>
                                        {result && analysTask(val.id)}
                                    </form>
                                </div>
                            </div>
                        </div>)
                    : <div>Подгрузка</div>
            }
        </div>
    );
};

export default TaskItem;