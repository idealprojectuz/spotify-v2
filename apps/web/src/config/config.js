import axios from "axios";

// console.log(import.meta.env);
export const request = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL,
});
