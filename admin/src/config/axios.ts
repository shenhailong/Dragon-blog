import axios from 'axios';
import { notification } from 'antd';

// 仅供参考
// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

axios.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      if (!config.params) {
        config.params = {};
      }
      config.params._ = Date.now();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // cancel 的不处理
    if (axios.isCancel(error)) {
    } else {
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        notification.error({ message: '请求超时' });
      } else if (error && error.response) {
        let str = '出现网络错误,请重试';
        switch (error.response.status) {
          case 400:
            str = '请求错误';
            break;
          case 401:
            str = '未授权，请登录';
            break;
          case 403:
            str = '拒绝访问';
            break;
          case 404:
            str = `请求地址出错: ${error.response.config.url}`;
            break;
          case 408:
            str = '请求超时';
            break;
          case 500:
            str = '服务器内部错误';
            break;
          case 501:
            str = '服务未实现';
            break;
          case 502:
            str = '网关错误';
            break;
          case 503:
            str = '服务不可用';
            break;
          case 504:
            str = '网关超时';
            break;
          case 505:
            str = 'HTTP版本不受支持';
            break;
          default:
        }
        // if (process.env.NODE_ENV === 'production') {
        // 登录页不做跳转处理咯
        if (window.location.href.indexOf('login') !== -1) {
        } else {
          window.location.hash = `#/error?statusCode=${encodeURIComponent(
            error.response.status,
          )}&message=${encodeURIComponent(str)}`;
        }
        // }
        notification.error({ message: str });
      } else {
        notification.error({ message: '出现网络错误,请重试' });
      }
    }
    return Promise.reject(error);
  },
);
