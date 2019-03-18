import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: "http://www.switchart.tk/api"
    baseURL: "http://localhost:8000/api"
});

export default axiosInstance;