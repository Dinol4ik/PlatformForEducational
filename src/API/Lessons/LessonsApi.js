import axios from "axios";
import {API_URL, HOST_URL} from "../URLsite";

export default class LessonsApi {
    static async getLessonsInCurse(idCurse) {
        const responseLessons = await axios.get(`${API_URL}/v1/lessonsInCourses/` + idCurse)
        return responseLessons.data
    }

    static async checkUserInCourse(idCourse) {
        const responseLessons = await axios.post(`${HOST_URL}/chekUser`,
            {
                "profile_id": localStorage.getItem('UserProfileId'),
                "curse_id":idCourse
            })
        return responseLessons.data
    }
}