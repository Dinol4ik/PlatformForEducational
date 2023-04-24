import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TaskInTheme from "../../API/TaskApi/TaskInTheme";
import axios from "axios";

const TaskItem = (props) => {
    const idThem = useParams()
    const [task, setTask] = useState()
    useEffect(() => {
        fetchTask()
    }, [])

    async function fetchTask() {
        const result = await TaskInTheme.getAllTask(idThem.id)
        setTask(result)
    }

    function submit(event) {
        console.log(event.target.answer.value)
       const res =  axios.post('http://127.0.0.1:8000/analys',{
            "answer":event.target.answer.value
        },{xsrfCookieName])
        event.preventDefault()
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
                                        <input type='hidden' name="_csrf" value={localStorage.getItem('token')}/>
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