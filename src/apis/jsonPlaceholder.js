import axios from 'axios'

export const jsonPlaceholder = axios.create({
    baseURL: 'http://localhost:3001'
});