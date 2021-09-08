/* eslint-disable prettier/prettier */
import axios from 'axios';

// 
export default axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-type": "application/json",  
    "Access-Control-Allow-Origin": "*",
    'secure':false,
    "X-CSRFToken" : "26Hmmos01I0WiN3kcIFQL4DtO5PUnO0Zp86FHZmJobFgvyjTxW4ttGtBtmgHqmVx",
    "sessionid" : "tz766ecsucxrikcbnactc9e5125nqqwk"
  }
});