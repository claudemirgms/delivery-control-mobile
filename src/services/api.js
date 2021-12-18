import axios from 'axios';

const api = axios.create({
    baseURL: 'https://delivery-control-bkend.herokuapp.com'
});

export default api;