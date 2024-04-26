// build-client.js
import axios from 'axios';

const buildClient = () => {
  return axios.create({
    baseURL: '/',
  });
};

export default buildClient;
