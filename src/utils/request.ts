import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import notification from 'ant-design-vue/es/notification';

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: '/api',
  timeout: 6000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
  if (error.response) {
    const { data } = error.response;
    // 从 localstorage 获取 token
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message,
      });
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed',
      });
    }
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    const headers = config.headers as Record<string, any>;
    headers['Access-Token'] = token;
  }
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use(response => {
  return response.data;
}, errorHandler);

export default request;
export { request as axios };
