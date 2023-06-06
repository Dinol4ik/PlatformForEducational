import axios from "axios";
import {API_URL} from "../URLsite";

export default class TaskApi {
    static async getAllTask(){
        const responseTask = await axios.get(`${API_URL}/v1/task`)
        return responseTask.data
    }

}