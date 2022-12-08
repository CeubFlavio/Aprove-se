import axios from "axios";

const api = axios.create({
    baseURL: "https://grupo9ggizi.com/api",
    responseType: 'json',
    headers: {
        'Content-Type': 'multipart/form-data'
    },
});

export default api;