import axios from "axios";

export default class subjectAPI{
    static async getAllSubject(){
        const responseSubj = await axios.get('http://127.0.0.1:8000/api/v1/subject')
        return responseSubj.data
    }
}