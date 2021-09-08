/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import axios from 'axios';

// 
export default axios.create({
  baseURL: "http://127.0.0.1:8000/dj-rest-auth",
  headers: {
    "Content-type": "application/json",
  }
});