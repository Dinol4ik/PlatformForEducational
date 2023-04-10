import axios from "axios";

export default class CurseInProfile{
 static async getInfoAboutCurseInProfiel(){
     const  response = await axios.get('http://127.0.0.1:8000/api/v1/profile/'+localStorage.getItem('UserProfileId'))
     return  response.data
 }
}