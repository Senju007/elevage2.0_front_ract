/* eslint-disable prettier/prettier */
import http from '../http-login';

const logIn = (data) => http.post('/login/', data);

export default {
  logIn,
};
