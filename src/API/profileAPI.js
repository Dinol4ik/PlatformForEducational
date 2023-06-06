import axios from "axios";
import {HOST_URL} from "./URLsite";

export default class ProfileId{
    static async getProfileId(){
        const responseSubj = await axios.get(`${HOST_URL}/auth/users/me`, {headers:{Authorization: 'Bearer '+ localStorage.getItem('token')}})
        return responseSubj.data
    }
}