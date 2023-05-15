import axios from "axios";

export default class AllUsersInCourse {
    static async getUsersInCurse(idCurse){
        const responseLessons = await axios.get('http://127.0.0.1:8000/api/v1/userInCourse/'+idCurse)
        return responseLessons.data
    }
     static async getTaskForHomeWork(){
        const responseLessons = await axios.get('http://127.0.0.1:8000/api/v1/task')
        return responseLessons.data
    }
}