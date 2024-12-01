import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080"
});

export const BASE_URL = "http://localhost:8080";