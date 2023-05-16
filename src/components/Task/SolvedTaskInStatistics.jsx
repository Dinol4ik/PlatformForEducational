import React, {useEffect, useState} from 'react';
import SolveTask from "../../API/TaskApi/SolveTask";
import axios from "axios";

const SolvedTaskInStatistics = () => {
const [solve, setSolve] = useState()
    const [result, setResult] = useState()
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
            if (solve['id'] == id) {
                console.log(id)
                return <>
                    <button style={{backgroundColor: solve['color']}}>Отправить</button>
                    {solve['res']}</>
            }
        }
        let sovpalo = 0
        result.map(e => {
            if (e.task['id'] == id) {
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
                result
                    ? result.map(val =>
                        <div className='task-list'>
                            <div className='task'>
                                <div>
                                    {val.task.title}
                                </div>
                                <div>
                                    <img src={val.task.img_task}/>
                                    <form onSubmit={submit}>
                                        <input type='hidden' name="idTask" value={val.task.id}/>
                                        <input type="text" name='answer'/>
                                        {result && analysTask(val.task.id)}
                                    </form>
                                </div>
                            </div>
                        </div>)
                    : <div>Подгрузка</div>
            }
        </div>
    );
};


export default SolvedTaskInStatistics;