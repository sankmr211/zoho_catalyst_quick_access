import axios from 'axios';

// Create an Axios instance with custom configurations
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL_PATH}`, // Base URL for all requests
    timeout: 300000, // 5 minites timeout
});

// Request interceptor to handle things like adding tokens dynamically
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors or transform responses
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
