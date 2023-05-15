import axios from "axios";

export default class CreateHomeWork {
    static async getSomeLessonsInCurse(idlesson, idTask) {
        const responseSomeLessons = await axios.put('http://127.0.0.1:8000/api/v1/someLessonsInCourses/' + idlesson.id, {
            "title": idlesson.title,
            "date_time": idlesson.date_time,
            "home_task":idTask
        })
        return responseSomeLessons.data
    }
}