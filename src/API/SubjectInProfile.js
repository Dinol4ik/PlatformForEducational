import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context";

export default class SubjectInProfile {
    static async getCurseInSubject(id) {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/subject/'+id, {headers:{Authorization: 'Bearer '+ localStorage.getItem('token')}})
        return response.data
    }
}