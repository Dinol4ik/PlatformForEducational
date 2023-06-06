import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context";
import {API_URL} from "./URLsite";

export default class SubjectInProfile {
    static async getCurseInSubject(id) {
        const response = await axios.get(`${API_URL}/v1/subject/`+id, {headers:{Authorization: 'Bearer '+ localStorage.getItem('token')}})
        console.log(localStorage.getItem('token'))
        return response.data
    }
}