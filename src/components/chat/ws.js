import axios from "axios";
import {API_URL} from "../../API/URLsite";

export default class SocketCon {
    static getSocket(id) {
       const socket = new WebSocket(`ws://127.0.0.1:8080/ws/${id}?connectId=${localStorage.getItem("profileId")}`)
        return socket
    }
}