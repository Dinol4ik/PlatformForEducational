import React, {useEffect, useState} from 'react';
import Counets from "./components/counets";
import './styles/main/style.css';
import PostList from "./components/postList";
import Layot from "./components/layot";
import CursesAPI from "./API/CursesAPI";
import SubjectApi from "./API/subjectApi";
import {Route, Routes} from "react-router-dom";
import Login from "./components/login";
import {AuthContext} from "./context";
import Calendar from "./components/Calendar";
import { ChakraProvider } from '@chakra-ui/react'


function App (){
    useEffect(()=>{
        fetchSubject()
        fetchApp()

    },[])
    const [posts,setPost] = useState([])
    const [subjects,setSubject] = useState([])
    async function fetchApp(){
        const post = await CursesAPI.getAll();
        setPost(post)
    }
    async function fetchSubject() {
        const subject = await SubjectApi.getAllSubject()
        setSubject(subject)
    }
    const [isAuth,setIsAuth] = useState(false)
     return(

         <>
         <AuthContext.Provider value={{
            isAuth,
             setIsAuth: setIsAuth
         }}>
             <ChakraProvider>
            <Routes>
                <Route path="/" element={<Layot/>}>
                    <Route index element={<PostList post={posts} subject = {subjects}/>}/>
            <Route path={'buy'} element={<Counets/>}></Route>
            <Route path={'account'} element={<Login/>}></Route>
                    <Route path={'sheldue'} element={<Calendar/>}></Route>
        </Route>
</Routes>
                 </ChakraProvider>
             </AuthContext.Provider>
         </>
        );
}
export default App;