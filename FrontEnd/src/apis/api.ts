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

let sessionApi = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
    Authorization: sessionStorage.getItem("accessToken"),
  },
});

let fileApi = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
    Authorization: sessionStorage.getItem("accessToken"),
  },
});

export { api, fileApi, sessionApi };
