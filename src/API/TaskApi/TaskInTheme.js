import axios from "axios";
import {API_URL} from "../URLsite";

export default class TaskInTheme {
    static async getAllTask(id){
        const responseSubj = await axios.get(`${API_URL}/v1/themeTask/`+id)
        return responseSubj.data
    }

}