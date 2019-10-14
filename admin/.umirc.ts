import { IConfig } from 'umi-types';
import Routes from './config/router.config';
console.log(process.env);
// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes: Routes,
  publicPath: '/public/admin/',
  hash: true,
  history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          immer: true,
        },
        dynamicImport: { webpackChunkName: true },
        title: 'umi_antd',
        dll: true,
        locale: {
          default: 'zh-CN', // default zh-CN
          baseNavigator: false, // default true, when it is true, will use navigator.language overwrite default
          antd: false
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  devServer: {
    proxy: {
      '/api/**': { target: 'http://127.0.0.1:7001/' }
    }
  },
  define: {
    'process.env.TOKEN_KEY': process.env.TOKEN_KEY,
  },
};

export default config;
