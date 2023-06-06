import axios from "axios";
import {API_URL} from "../URLsite";

export default class SolveTask {
    static async getAllSolveTask(id){
        const responseSubj = await axios.get(`${API_URL}/v1/solveTaskInProfile/`+id)
        return responseSubj.data
    }
}