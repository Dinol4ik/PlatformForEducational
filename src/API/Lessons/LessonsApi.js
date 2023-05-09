import axios from "axios";

export default class LessonsApi {
    static async getLessonsInCurse(idCurse){
        const responseLessons = await axios.get('http://127.0.0.1:8000/api/v1/lessonsInCourses/'+idCurse)
        return responseLessons.data
    }
}