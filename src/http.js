import axios from 'axios';
import store from './store/store'

axios.defaults.baseURL = 'http://127.0.0.1:8360';

//发送请求的拦截器
axios.interceptors.request.use((config) => {
  if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `token ${store.state.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
// 响应数据的拦截器
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default axios;
