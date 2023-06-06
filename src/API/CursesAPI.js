import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context";
import {API_URL} from "./URLsite";

export default class CursesAPI {
    static async getAll() {
        const response = await axios.get(`${API_URL}/v1/curses`)
        return response.data
    }
}