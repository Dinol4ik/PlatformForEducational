import axios from "axios";
import {API_URL, HOST_URL} from "./URLsite";

export default class subjectAPI{
    static async getAllSubject(){
        const responseSubj = await axios.get(`${API_URL}/v1/subject`)
        return responseSubj.data
    }
}