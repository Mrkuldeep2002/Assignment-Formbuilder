import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "/";

const instance = axios.create({
  baseURL,
  // optional: headers or withCredentials, if needed
});

export default instance;
