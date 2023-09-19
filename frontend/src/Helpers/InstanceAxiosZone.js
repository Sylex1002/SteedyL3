import axios from "axios";

const instancesAxiosZone = axios.create({
  baseURL: "http://localhost:5500",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application.json",
  },
});

export default instancesAxiosZone;
