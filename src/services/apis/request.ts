import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { requestHelpers } from 'helpers';
import { userServices } from 'services';

const { apiServices } = window.config;

const catalogClient = axios.create({
  baseURL: apiServices.catalog,
});

const API = axios.create({
  baseURL: 'http://139.180.211.121:8050',
});

const getAuthorization = () => {
  return userServices.isLoggedIn()
    ? `Bearer ${userServices.getAccessToken()}`
    : '';
};

// Do something before request is sent
const requestInterceptor = (request: AxiosRequestConfig) => {
  request.headers.Authorization = getAuthorization();
  return request;
};

// Any status code that lie within the range of 2xx cause this function to trigger
const responseSuccessInterceptor = (response: AxiosResponse) => {
  // Do something with response data
  return response;
};

// Any status codes that falls outside the range of 2xx cause this function to trigger
const responseErrorInterceptor = (error: AxiosError) => {
  // Do something with response error
  requestHelpers.handleResponseError(error);
  return Promise.reject(error);
};

const clients = [catalogClient];

clients.forEach(client => {
  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor
  );
});

export default {
  catalogClient,
  API,
};
