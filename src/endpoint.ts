import axios, { AxiosInstance } from 'axios';

const endpoint: AxiosInstance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add a request interceptor
endpoint.interceptors.request.use(function (config) {
    console.log('Request was sent');
    return config;
}, (error) => {
    return Promise.reject(error);
});

endpoint.interceptors.response.use(function (response) {
    console.log('Response was received');
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default endpoint;
