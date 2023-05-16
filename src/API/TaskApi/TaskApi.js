import axios from "axios";

export default class TaskApi {
    static async getAllTask(){
        const responseTask = await axios.get('http://127.0.0.1:8000/api/v1/task')
        return responseTask.data
    }

}