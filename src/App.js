import React, {useEffect, useState} from 'react';
import './styles/main/style.css';
import PostList from "./components/PostList";
import Layout from "./components/Layout";
import CursesAPI from "./API/CursesAPI";
import SubjectApi from "./API/subjectApi";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import {AuthContext} from "./context/AuthContext";
import Calendar from "./components/Calendar";
import {Box, ChakraProvider} from '@chakra-ui/react'
import RequireAuth from "./context/RequireAuth";
import NotFoundPage from "./pages/NotFoundPage";
// import RequireAuth, { RecuireAuth } from './context/RequireAuth'


function App (){
    const [posts,setPost] = useState([])
    const [subjects,setSubject] = useState([])
    const [isAuth,setIsAuth] = useState(false)

    useEffect(()=>{
        fetchSubject()
        fetchApp()
    },[])

    async function fetchApp(){
        const post = await CursesAPI.getAll();
        setPost(post)
    }

    async function fetchSubject() {
        const subject = await SubjectApi.getAllSubject()
        setSubject(subject)
    }

    return(
        <ChakraProvider>
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth: setIsAuth
            }}>
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        <Route index element={<PostList post={posts} subject = {subjects}/>}/>
                        <Route path={'account'} element={<Login/>} />
                        <Route path={'schedule'} element={
                            <RequireAuth>
                                <Calendar/>
                            </RequireAuth>
                        }/>
                        <Route path={'*'} element={<NotFoundPage/>} />
                    </Route>
                </Routes>
            </AuthContext.Provider>
        </ChakraProvider>
    );
}
export default App;