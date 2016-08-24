import axios from 'axios';

export default token => {
  return axios.create({
    headers: token ? {Authorization: `Bearer ${token}`} : {},
    baseURL: process.env.WEBPACK_ENV !== 'client' ? `http://${process.env.API_HOST}:${process.env.API_PORT}/` : '/'
  });
};