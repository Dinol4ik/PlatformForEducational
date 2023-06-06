import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context";
import {API_URL} from "./URLsite";

export default class UserNameAPI {
    static async getUserName() {

        if (localStorage.getItem('profileId')){
             const response = await axios.get(`${API_URL}/v1/users/`+localStorage.getItem('profileId'))
            console.log('Сработал нейм')
        return response.data
        }
        else console.log('не успел дойти')
    }
}