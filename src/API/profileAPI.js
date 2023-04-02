import axios from "axios";

export default class ProfileId{
    static async getProfileId(){
        const responseSubj = await axios.get('http://127.0.0.1:8000/auth/users/me', {headers:{Authorization: 'Bearer '+ localStorage.getItem('token')}})
        return responseSubj.data
    }
}