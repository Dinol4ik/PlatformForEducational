import axios from "axios";
import {API_URL} from "../URLsite";

export default class SectionApi{
    static async getAllSection(){
        const responseSubj = await axios.get(`${API_URL}/v1/section`)
        return responseSubj.data
    }
}