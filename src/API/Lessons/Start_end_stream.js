import axios from "axios";
import {API_URL} from "../URLsite";


export default class Start_end_stream {
    static async getSomeLessonsInCurse(Lesson,status) {
        const responseSomeLessons = await axios.put(`${API_URL}/v1/someLessonsInCourses/` + Lesson.id, {
            "title": Lesson.title,
            "date_time": Lesson.date_time,
            "home_task":Lesson.home_task,
            "stream_status":status
        })
        console.log(Lesson)
        console.log(status)
        return responseSomeLessons.data
    }
    static async loadVideo(Lesson,video) {
        const responseSomeLessons = await axios.put(`${API_URL}/v1/someLessonsInCourses/` + Lesson.id, {
            "title": Lesson.title,
            "date_time": Lesson.date_time,
            "home_task":Lesson.home_task,
            "video":video,
            "stream_status":"end"
        },{headers:{'Content-Type': 'multipart/form-data'}})
        return responseSomeLessons.data
    }
}