import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context";

export default class UserNameAPI {
    static async getUserName() {

        if (localStorage.getItem('profileId')){
             const response = await axios.get('http://127.0.0.1:8000/api/v1/users/'+localStorage.getItem('profileId'))
            console.log('Сработал нейм')
        return response.data
        }
        else console.log('не успел дойти')
    }
}