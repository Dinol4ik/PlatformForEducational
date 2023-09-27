import axios from "axios";
import {API_URL} from "./URLsite";

export default class LessonAPI {
    static async getAll() {
        // const response = await axios.get('http://127.0.0.1:8000/api/v1/curses', {headers:{Authorization: 'Bearer'}})
        const response = await axios.get(`${API_URL}/v1/lessons`)
        return response.data
    }
     static async getAllId() {
        // const response = await axios.get('http://127.0.0.1:8000/api/v1/curses', {headers:{Authorization: 'Bearer'}})
        const response = await axios.get(`${API_URL}/v1/getFutureLessons`)
        return response.data
    }
}