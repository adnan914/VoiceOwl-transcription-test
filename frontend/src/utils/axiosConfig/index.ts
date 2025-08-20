import config from "../config";
import authInterceptor from "./interceptors/authInterceptor";
import serverErrorHandler from "./interceptors/serverErrorHandler";
import successHandler from "./interceptors/successHandler";
import axios from "axios";
// const axios = require('axios');

const instance = axios.create({
  baseURL: config.API_URL
});

instance.interceptors.request.use(authInterceptor, (error) => error);
instance.interceptors.response.use(successHandler, (error) => serverErrorHandler(error));

export default instance;