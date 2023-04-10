import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context";

export default class CursesAPI {
    static async getAll() {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/curses', {headers:{Authorization: 'Bearer '+ localStorage.getItem('token')}})
        return response.data
    }
}