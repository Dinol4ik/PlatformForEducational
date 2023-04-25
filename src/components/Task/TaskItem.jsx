import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TaskInTheme from "../../API/TaskApi/TaskInTheme";
import axios from "axios";
import SolveTask from "../../API/TaskApi/SolveTask";

const TaskItem = () => {
    const idThem = useParams()
    const [task, setTask] = useState()
    useEffect(() => {
        fetchTask()
        fetchSolveTask()
    }, [])
    const [result,setResult]=useState([])

    async function fetchTask() {
        const res = await TaskInTheme.getAllTask(idThem.id)
        setTask(res)
    }
     async function fetchSolveTask() {
        const result = await SolveTask.getAllSolveTask(localStorage.getItem('UserProfileId'))
        setResult(result)
    }

    function submit(event) {
        const res = axios.post('http://127.0.0.1:8000/analys', {
            "answer": event.target.answer.value,
            "idTask": event.target.idTask.value,
            "idProfile": localStorage.getItem('UserProfileId')
        })
        res.then(t=>{if(t.data.answer === 'true'){

        }})
        event.preventDefault()
    }

    return (
        <div>
            {result?console.log(result):console.log('netu')}
            {/*<div>Решено задач = {result}</div>*/}
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
                                        <button>Ответить</button>
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