import React, {useEffect, useState} from 'react';
import './styles/main/style.css';
import PostList from "./components/postList";
import Layot from "./components/layot";
import CursesAPI from "./API/CursesAPI";
import SubjectApi from "./API/subjectApi";
import {json, Route, Routes, useLocation} from "react-router-dom";
import Login from "./components/login";
import {AuthContext} from "./context";
import Calendar from "./components/Calendar/Calendar";
import {ChakraProvider} from '@chakra-ui/react'
import UserNameAPI from "./API/userNameAPi";
import RequireAuth from "./hoc/requireAuth";
import Profile from "./components/UserProfile/Profile";
import Subject from "./components/Subject";
import {AnimatePresence} from "framer-motion";
import TaskList from "./components/Task/TaskList";
import TaskItem from "./components/Task/TaskItem";
import SolvedTaskInStatistics from "./components/Task/SolvedTaskInStatistics";
import LessonsList from "./components/Lessons/LessonsList";
import LessonsItem from "./components/Lessons/lessonsItem";
import RequireStaff from "./hoc/requirerStaff";
import CreateHomeTask from "./components/staff/createHomeTask";
import HomeWork from "./components/UserProfile/HomeWork";
import ListHomeTask from "./components/Lessons/listHomeTask";
import AdminScreen from "./components/Administrator/adminScreen";
import InformationAboutAllCourses from "./components/Administrator/informationAboutAllCourses";
import Chat from "./components/chat/chat";
import LessonsListForAdmin from "./components/Administrator/lessonsListForAdmin";
import SubjectLayout from "./components/Lessons/SubjectLayout";


function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [token, setToken] = useState('')
    const [posts, setPost] = useState([])
    const [subjects, setSubject] = useState([])
    const [profileId, setProfileId] = useState([])
    const location = useLocation()

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth('true')
        }
        if (localStorage.getItem('token')) {
            setToken(token)
            console.log('это токен сработал с запуска сайта- ' + token)
        }
        fetchSubject()
        fetchApp()
        setTimeout(() => {
            fetchProfileName()
        }, 1000)

    }, [])

    async function fetchApp() {
        const post = await CursesAPI.getAll();
        setPost(post)
    }

    async function fetchProfileName() {
        const profileName = await UserNameAPI.getUserName()
        // .then(() => {
        //     localStorage.setItem('UserProfileId', profileName.profile);
        //     localStorage.setItem('profileName', JSON.stringify(profileName));
        // })
        if (profileName) {
            localStorage.setItem('UserProfileId', profileName.profile)
            localStorage.setItem('profileName', JSON.stringify(profileName))
        }
    }

    async function fetchSubject() {
        const subject = await SubjectApi.getAllSubject()
        setSubject(subject)
    }

    return (
        <AuthContext.Provider value={{
            profileId,
            isAuth,
            token,
            setToken: setToken,
            setIsAuth: setIsAuth,
            setProfileId: setProfileId,

        }}>
            <ChakraProvider>
                {/*<AnimatePresence mode={'wait'}>*/}
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<Layot/>}>
                        <Route index element={<PostList post={posts} subject={subjects}/>}/>
                        <Route path={'login'} element={<Login/>}/>
                        <Route path={'schedule'} element={<Calendar/>}/>
                        <Route path={'profile'} element={
                            <RequireAuth>
                                <Profile/>
                            </RequireAuth>
                        }/>
                        <Route path={'profile/statistic'} element={
                            <RequireAuth>
                                <SolvedTaskInStatistics/>
                            </RequireAuth>
                        }/>
                        <Route path={'profile/subject'} element={<SubjectLayout/>}>
                            <Route path={':id'} element={
                                <RequireAuth>
                                    <Subject/>
                                </RequireAuth>
                            }/>
                            <Route path={':idSubject/:id'} element={
                                <RequireAuth>
                                    <LessonsList/>
                                </RequireAuth>
                            }/>
                            <Route path={':idSubject/:idCourse/:id'} element={
                                <RequireAuth>
                                    <LessonsItem/>
                                </RequireAuth>
                            }/>
                        </Route>
                        <Route path={'taskList'} element={
                            <TaskList/>
                        }/>
                        <Route path={'profile/homework'} element={
                            <RequireAuth>
                                <HomeWork/>
                            </RequireAuth>
                        }/>
                        <Route path={'create/homeTask'} element={
                            <RequireStaff>
                                <CreateHomeTask/>
                            </RequireStaff>
                        }/>
                        <Route path={'homework/lesson/:id'} element={
                            <RequireAuth>
                                <ListHomeTask/>
                            </RequireAuth>
                        }/>
                        <Route path={'admin'} element={
                            <RequireStaff>
                                <AdminScreen/>
                            </RequireStaff>
                        }/>
                        <Route path={'admin/information'} element={
                            <RequireStaff>
                                <InformationAboutAllCourses/>
                            </RequireStaff>
                        }/>
                        <Route path={'/admin/reload-chat'} element={
                            <RequireStaff>
                                <LessonsListForAdmin/>
                            </RequireStaff>
                        }/>
                        <Route path={'taskList/theme/:id'} element={<TaskItem/>}/>
                    </Route>
                </Routes>
                {/*</AnimatePresence>*/}
            </ChakraProvider>
        </AuthContext.Provider>
    );
}

export default App;