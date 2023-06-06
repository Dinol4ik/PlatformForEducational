import axios from "axios";
import {API_URL} from "../../URLsite";

export default class CreateHomeWork {
    static async getSomeLessonsInCurse(idlesson, idTask) {
        const responseSomeLessons = await axios.put(`${API_URL}/v1/someLessonsInCourses/` + idlesson.id, {
            "title": idlesson.title,
            "date_time": idlesson.date_time,
            "home_task":idTask
        })
        return responseSomeLessons.data
    }
}