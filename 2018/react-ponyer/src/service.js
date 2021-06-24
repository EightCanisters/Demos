import axios from 'axios';
import {
  Toast
} from 'antd-mobile';

//创建实例
const isDev = process.env.NODE_ENV === 'development';
// console.log(isDev)
const ajax = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/95091' : '真实的地址'
});

//拦截器
ajax.interceptors.request.use(config => {
  Toast.loading('加载中...', 0)
  return config;
});

ajax.interceptors.response.use(resp => {
  Toast.hide();
  return resp;
})

export const getHomeCarousel = () => {
  return ajax.get('/api/v2/carousel');
}

export const getHomeMenu = () => {
  return ajax.get('/api/v2/menu');
}

export const getHomeContent = (params) => {
  return ajax.get('/api/v2/home/content',{ params });
}

export const getDetailContent = (id) => {
  return ajax.get(`/api/v2/detail/${id}`);
}

export const getCartGuess = () => {
  return ajax.get('/api/v2/guessyoulike');
}

export const getCateNav = () => {
  return ajax.get('/api/v2/cate/nav');
}

export const getCateContent = ({ id }) => {
  return ajax.get('/api/v2/cate/content',{ id });
}

export const getListContent = ({ id }) => {
  return ajax.get('/api/v2/list',{ id });
}

export const login = ({username, password}) => {
  return ajax.post('/api/v2/login', {
    username,
    password
  });
}

export const checkLogin = ({token}) => {
  return ajax.post('/api/v2/checkLogin', {
    token
  });
}