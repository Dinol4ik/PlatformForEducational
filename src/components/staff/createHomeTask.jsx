import React, {useEffect, useState} from 'react';
import AllUsersInCourse from "../../API/Lessons/homeWork/AllUsersInCourse";
import {useLocation} from "react-router-dom";
import TaskList from "../Task/TaskList";
import CreateHomeWork from "../../API/Lessons/homeWork/CreateHomeWork";

const CreateHomeTask = () => {
    const id = useLocation()
    console.log(id.state)
    const [homeTaskInfo, setHomeTaskInfo] = useState({"title":id.state.lesson_title,"date_time":id.state.lesson_date_time,"id":id.state.lesson_id})
    const [homeTaskId, setHomeTaskId] = useState([])
    const [user, setUsers] = useState()
    const [homeWork, setHomeWork] = useState()
    useEffect(() => {
        fetchUsersForHomeWork()
    }, [])

    async function fetchUsersForHomeWork() {
        const result = await AllUsersInCourse.getUsersInCurse(id.state.course_id)
        const homeWork = await AllUsersInCourse.getTaskForHomeWork()
        setUsers(result)
        setHomeWork(homeWork)
    }

    function selectTask(event) {
        console.log(event.target)
        if (!homeTaskId.includes(event.target.id)&&event.target.id !== '') {
            setHomeTaskId([...homeTaskId, event.target.id])
        }
    }
   async function sendHomeWork(event){
        const send = await CreateHomeWork.getSomeLessonsInCurse(homeTaskInfo,homeTaskId )
       console.log(send)
    }

    return (
        <div>
            {user
                ? <div>Пользователи у которых куплен курс
                    <div>{user.map((t) => <div>{t.profile.name}</div>)}</div>
                    <hr></hr>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <div style={{
                            height: '500px', /* высота нашего блока */
                            width: '50%', /* ширина нашего блока */
                            background: '#fff', /* цвет фона, белый */
                            border: '1px solid #C1C1C1', /* размер и цвет границы блока */
                            overflowY: 'scroll', /* прокрутка по вертикали */
                        }}>
                            {homeWork ?
                                <>
                                    {homeWork.map(value => {
                                        return <div onClick={selectTask}>

                                            {value.title}
                                            <div><img src={value.img_task}/></div>
                                            <div style={{textAlign: 'center'}}><input id={value.id} type="button"
                                                                                      value="Добавить"/></div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                        </div>
                                    })}
                                </>
                                :
                                <>нет дз</>
                            }
                        </div>
                        <div style={{
                            height: '500px', /* высота нашего блока */
                            width: '500px', /* ширина нашего блока */
                            background: '#fff', /* цвет фона, белый */
                            border: '1px solid #C1C1C1', /* размер и цвет границы блока */
                            overflowY: 'scroll', /* прокрутка по вертикали */
                        }}>

                            {homeTaskId}
                        </div>
                    </div>
                    <div onClick={sendHomeWork} style={{textAlign:'center', fontSize:'30px', cursor: 'pointer'}}>Отправить</div>
                </div>
                : <div>Загрузка</div>
            }
        </div>
    );
};

export default CreateHomeTask;