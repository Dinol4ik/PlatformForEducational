import axios from "axios";

export default class SolveTask {
    static async getAllSolveTask(id){
        const responseSubj = await axios.get('http://127.0.0.1:8000/api/v1/solveTaskInProfile/'+id)
        return responseSubj.data
    }
}