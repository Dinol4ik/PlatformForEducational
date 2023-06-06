import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context";
import {API_URL} from "./URLsite";

export default class AddCurseInProfile {
    static async addCurse(iduser,idcurse) {
        const response = await axios.post(`${API_URL}/v1/addcurse/`,{"profile":iduser,"curse":idcurse}, {headers:{Authorization: 'Bearer '+ localStorage.getItem('token')}})
        return response.data
    }
}