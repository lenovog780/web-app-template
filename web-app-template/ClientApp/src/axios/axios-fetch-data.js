import axios from 'axios';
import AuthStore from '../store/localStorage/auth';

export const baseURL = 'http://localhost:5000/';

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    function (config) {
        const token = AuthStore.getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;