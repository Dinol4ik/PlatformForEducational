import React, {useEffect, useState} from 'react';
import './styles/main/style.css';
import PostList from "./components/postList";
import Layot from "./components/layot";
import CursesAPI from "./API/CursesAPI";
import SubjectApi from "./API/subjectApi";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/login";
import {AuthContext} from "./context";
import Calendar from "./components/Calendar";
import {ChakraProvider} from '@chakra-ui/react'
import UserNameAPI from "./API/userNameAPi";
import RequireAuth from "./hoc/requireAuth";
import Profile from "./components/Profile";
import Subject from "./components/Subject";


function App() {
    const [isAuth, setIsAuth] = useState(false)
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
    const [token, setToken] = useState('')
    const [posts, setPost] = useState([])
    const [subjects, setSubject] = useState([])
    const [profileId, setProfileId] = useState([])

    async function fetchApp() {
        const post = await CursesAPI.getAll();
        setPost(post)
    }

    async function fetchProfileName() {
        const profileName = await UserNameAPI.getUserName();
        localStorage.setItem('UserProfileId', profileName.profile)
        localStorage.setItem('profileName', profileName.first_name)
        localStorage.setItem('profileSecondName', profileName.last_name)
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
                <Routes>
                    <Route path="/" element={<Layot/>}>
                        <Route index element={<PostList post={posts} subject={subjects}/>}/>
                        <Route path={'login'} element={<Login/>}>
                        </Route>
                        <Route path={'schedule'} element={<Calendar/>}></Route>
                        <Route path={'profile'} element={<Profile/>}></Route>
                        <Route path={'profile/subject/:id'} element={
                            <RequireAuth>
                                <Subject/>
                            </RequireAuth>
                        }></Route>
                    </Route>
                </Routes>
            </ChakraProvider>
        </AuthContext.Provider>
    );
}

export default App;