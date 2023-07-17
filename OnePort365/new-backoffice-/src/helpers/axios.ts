// import store from "store";
import axios from "axios";
//apply base url for axios
const API_URL = process.env.REACT_APP_API_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

// let _store = store.getState().Login.user_token;
axiosApi.defaults.headers.common.Authorization = "Bearer " +
//   "Bearer " + _store ||
localStorage.getItem("token") || sessionStorage.getItem("token") || "";

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export function get(url: string, config = {}) {
  return axiosApi.get(url, { ...config });
}

export function post(url: string, data: object, config = {}) {
  return axiosApi.post(url, data, { ...config });
}

export function put(url: string, data: object, config = {}) {
  return axiosApi.put(url, data, { ...config });
}

export function patch(url: string, data: object, config = {}) {
  return axiosApi.patch(url, data, { ...config });
}

export function del(url: string, config = {}) {
  return axiosApi.delete(url, { ...config });
}
