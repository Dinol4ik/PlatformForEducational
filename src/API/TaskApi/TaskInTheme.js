import axios from "axios";

export default class TaskInTheme {
    static async getAllTask(id){
        const responseSubj = await axios.get('http://127.0.0.1:8000/api/v1/themeTask/'+id)
        return responseSubj.data
    }

}