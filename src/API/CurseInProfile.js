import axios from "axios";
import {API_URL} from "./URLsite";

export default class CurseInProfile{
 static async getInfoAboutCurseInProfiel(){
     const  response = await axios.get(`${API_URL}/v1/profile/`+localStorage.getItem('UserProfileId'))
     return  response.data
 }
}