import axios from "axios";
export const api = "http://localhost:8000/api";

// const token = window.localStorage.getItem('token');

export const InstanceAxiosAdmin = axios.create({
  baseURL: api,
  // withCredentials: true,
  // headers: {
  //     authorization: token ? `Bearer ${token}` : ''
  // }
});
