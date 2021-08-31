/* eslint-disable prettier/prettier */
import axios from 'axios';
// 
export default axios.create({
  baseURL: "http://127.0.0.1:8000/elevageAPI",
  headers: {
    "Content-type": "application/json"
  }
});