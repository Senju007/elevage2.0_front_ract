/* eslint-disable prettier/prettier */
import http from '../http-auth';

const getUser = () => http.get('/me');
const getCookie = () => http.get('/csrf_cookie/')
export default {
  getUser,
  getCookie
};
