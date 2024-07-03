import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Axios = axios.create({
    baseURL: `http://192.168.1.226:8000/api/`, 
    
    // baseURL: `http://127.0.0.1:8000/api/`,

});

Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear token from local storage
            localStorage.removeItem('token');
            // Redirect to login page
            const navigate = useNavigate(); 
            navigate('/login');
        }
        return Promise.reject(error);
    }
);

export default Axios;
