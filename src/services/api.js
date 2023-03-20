import axios from 'axios';
import { BASE_URL } from '../Util/constants';

const urlProduction = '';


const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

export default api;
