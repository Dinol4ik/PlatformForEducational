import axios from "axios";

export default class LessonsApi {
    static async getLessonsInCurse(idCurse) {
        const responseLessons = await axios.get('http://127.0.0.1:8000/api/v1/lessonsInCourses/' + idCurse)
        return responseLessons.data
    }

    static async checkUserInCourse(idCourse) {
        const responseLessons = await axios.post('http://127.0.0.1:8000/chekUser',
            {
                "profile_id": localStorage.getItem('UserProfileId'),
                "curse_id":idCourse
            })
        return responseLessons.data
    }
}