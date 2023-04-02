import axios from "axios";

export default class LessonAPI {
    static async getAll() {
         //const response = await axios.get('http://127.0.0.1:8000/api/v1/curses', {headers:{Authorization: 'Bearer'}})
        const response = await axios.get('http://127.0.0.1:8000/api/v1/lessons')
        return response.data
    }
}