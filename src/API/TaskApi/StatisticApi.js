import axios from "axios";
export default class StatisticApi{
    static async getStatisticsUser(idProfile){
        const responseStatistic = await axios.get('http://127.0.0.1:8000/api/statistic/'+idProfile)
        return responseStatistic.data
    }
}