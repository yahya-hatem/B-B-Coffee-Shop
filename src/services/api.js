import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.sampleapis.com/coffee',
  timeout: 5000,
});

export default api;