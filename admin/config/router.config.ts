import { IRoute } from 'umi-types';
import {DefaultIndex} from '@/constants/defaultIndex';
const Routes: IRoute[] = [
  {
    path: '/user',
    component: '../layouts/user-layout.tsx',
    routes: [
      { path: '/user/', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './user/login' },
    ],
  },
  {
    path: '/',
    component: '../layouts/app-layout.tsx',
    routes: [
      { path: '/', redirect: DefaultIndex },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './dashboard/analysis',
          }
        ]
      },
      {
        path: '/basic',
        name: 'basic',
        icon: 'project',
        authority: ['admin', 'user'],
        Routes: ['src/pages/Authorized'],
        routes: [
          {
            path: '/basic/category',
            name: 'category',
            component: './basic/category',
          }
        ]
      },
      {
        path: '/article',
        name: 'article',
        icon: 'file-markdown',
        authority: ['admin', 'user'],
        Routes: ['src/pages/Authorized'],
        routes: [
          {
            path: '/article/list',
            name: 'list',
            component: './article/list',
          }
        ]
      }
    ]
  }
];

export default Routes;
