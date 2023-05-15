import axios from "axios";

export default class LessonsApi {
    static async getSomeLessonsInCurse(idlesson){
        const responseSomeLessons = await axios.get('http://127.0.0.1:8000/api/v1/someLessonsInCourses/'+idlesson)
        return responseSomeLessons.data
    }
}