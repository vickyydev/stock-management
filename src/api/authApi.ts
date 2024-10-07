import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUser = (userData: { username: string; password: string }) => {
  return axios.post(`${BASE_URL}/auth/register`, userData);
};

export const loginUser = (userData: { username: string; password: string }) => {
  return axios.post(`${BASE_URL}/auth/login`, userData);
};
