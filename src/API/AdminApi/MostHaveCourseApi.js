import axios from "axios";
import {API_URL} from "../URLsite";


// export default class MostHaveCourseApi {
//     static async TakeIdCourse() {
//         const response = await axios.post('http://127.0.0.1:8000/api/v1/section')
//         return response.data
//     }
// }
export default class MostHaveCourseApi {
    static async TakeIdCourse() {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/countBoughtCourses')
        return response.data
    }
    static async TakeMostCourse(id) {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/curse/'+id)
        return response.data
    }
    static async MoneyTaked() {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/zapiski')
        return response.data
    }
    static sendLessons(lessons) {
        const response = axios.post(`http://127.0.0.1:8080/api/createRooms`, {
            "lessonsId": lessons,
        })
        return response.data
    }
}