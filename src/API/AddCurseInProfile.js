import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context";

export default class AddCurseInProfile {
    static async addCurse(iduser,idcurse) {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/addcurse/',{"profile":iduser,"curse":idcurse}, {headers:{Authorization: 'Bearer '+ localStorage.getItem('token')}})
        return response.data
    }
}