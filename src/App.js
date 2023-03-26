import React, {useEffect, useState} from 'react';
import axios from "axios";
import Counets from "./components/counets";
import Input from "./components/input";
import './styles/main/style.css';
import PostItem from "./components/postItem";
import PostList from "./components/postList";
import Mainpage from "./components/mainPage";
import Layot from "./components/layot";
import CursesAPI from "./API/CursesAPI";
import SubjectApi from "./API/subjectApi";
import {Route, Routes} from "react-router-dom";


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
     return(
         <>
    <Routes>
        <Route path="/" element={<Layot/>}>
            <Route index element={<PostList post={posts} subject = {subjects}/>}/>
            <Route path={'buy'} element={<Counets/>}></Route>
        </Route>
</Routes>
         </>

        );
}
export default App;