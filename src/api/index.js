import axios from 'axios';

const url = 'http://localhost:5000/';



export const welcomeMessage = () => axios.get(url);

export const createUser = (userData) => axios.post(`${url}register`, userData);

export const loginUser = (loginData) => axios.post(`${url}login`, loginData);

