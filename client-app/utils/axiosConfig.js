import axios from 'axios';

const client = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
        post: {
            'Content-Type': 'application/json'
        },
        put: {
            'Content-Type': 'application/json'
        },
        delete: {
            'Content-Type': 'application/json'
        }
    }
});



export default client;