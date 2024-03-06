const axios = require('axios');
require('dotenv').config();

axios.defaults.headers.commonAuthorization = process.env.AUTH_TOKEN;

const axiosInstance = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/',
  timeout: 2000,
});

// if (axiosInstance) {
//   axiosInstance.default.headers.common.Authorization = process.env.AUTH_TOKEN;
// }

module.export = axiosInstance;
