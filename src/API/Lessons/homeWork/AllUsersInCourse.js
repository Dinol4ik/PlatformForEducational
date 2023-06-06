import axios from "axios";
import {API_URL} from "../../URLsite";

export default class AllUsersInCourse {
    static async getUsersInCurse(idCurse){
        const responseLessons = await axios.get(`${API_URL}/v1/userInCourse/`+idCurse)
        return responseLessons.data
    }
     static async getTaskForHomeWork(){
        const responseLessons = await axios.get(`${API_URL}/v1/task`)
        return responseLessons.data
    }
}