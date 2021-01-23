import axios from "axios";
import {toast } from 'react-toastify';
import logger from './logService';

axios.interceptors.response.use(null, (error) => {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      logger.log(error);
      toast.error("An unexpected error occurred!!");
    }
    return Promise.reject(error);
  });

  function setToken(token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }

  export default {
      get: axios.get,
      post: axios.post,
      put: axios.put,
      delete: axios.delete,
      setToken
  }