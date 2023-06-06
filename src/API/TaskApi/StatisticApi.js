import axios from "axios";
import {API_URL} from "../URLsite";
export default class StatisticApi{
    static async getStatisticsUser(idProfile){
        const responseStatistic = await axios.get(`${API_URL}/statistic/`+idProfile)
        return responseStatistic.data
    }
}