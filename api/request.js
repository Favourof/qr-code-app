import axios from "axios";

const baseURL = "https://qr-code-generator-objk.onrender.com/api/v1";

export const publicRequest = axios.create({
  baseURL: baseURL,
});