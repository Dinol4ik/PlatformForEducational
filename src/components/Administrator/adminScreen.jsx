import React, {useEffect, useState} from 'react';
import LeftBarInProfile from "../Navigation/LeftBar";
import AllUsersInCourse from "../../API/Lessons/homeWork/AllUsersInCourse";
import PostList from "../postList";
import SubjectApi from "../../API/subjectApi";
import CursesAPI from "../../API/CursesAPI";
import LaoutAdmin from "./laoutAdmin";

const AdminScreen = () => {
    const [posts, setPost] = useState([])
    const [subjects, setSubject] = useState([])
    const [user, setUsers] = useState()
    useEffect(() => {
        fetchSubject()
        fetchApp()
        fetchUsersForHomeWork()

    }, [])

    async function fetchSubject() {
        const subject = await SubjectApi.getAllSubject()
        setSubject(subject)
    }

    async function fetchApp() {
        const post = await CursesAPI.getAll();
        setPost(post)
    }

    async function fetchUsersForHomeWork() {
        const result = await AllUsersInCourse.getUsersInCurse(3)
        setUsers(result)
    }

    // console.log(user)
    return (
        <div>
           <LaoutAdmin><PostList post={posts} subject={subjects}/></LaoutAdmin>


        </div>
    );
};

export default AdminScreen;