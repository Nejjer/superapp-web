import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/app/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
