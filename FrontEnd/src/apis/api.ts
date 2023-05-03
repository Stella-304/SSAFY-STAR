import axios from "axios";

let api = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
    withCredentials: true,
  },
});

let fileApi = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
  },
});

export { api, fileApi };
