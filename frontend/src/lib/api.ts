import axios from 'axios';

const BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});