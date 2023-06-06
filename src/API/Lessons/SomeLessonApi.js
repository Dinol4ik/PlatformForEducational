import axios from "axios";
import {API_URL} from "../URLsite";

export default class LessonsApi {
    static async getSomeLessonsInCurse(idlesson){
        const responseSomeLessons = await axios.get(`${API_URL}/v1/someLessonsInCourses/`+idlesson)
        return responseSomeLessons.data
    }
}