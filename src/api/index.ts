import axios from 'axios';
import { API } from '../utils/constants';

const server = axios.create({
    baseURL: API.BASE_URL,
    timeout: 4000,
});

server.interceptors.request.use(function(config) {
    return config;
}, (error) => {
    return Promise.reject(error)
})

server.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
})

export default server;