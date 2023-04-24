import axios from "axios";

export default class SectionApi{
    static async getAllSection(){
        const responseSubj = await axios.get('http://127.0.0.1:8000/api/v1/section')
        return responseSubj.data
    }
}