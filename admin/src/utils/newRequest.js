import axios from 'axios';

const newRequest = axios.create({
    baseURL: "http://localhost:4000/api"
})

export default newRequest