# 大诚若谷员工通讯录管理平台
# 用户名：admin 密码：123456

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# build for production (Mac) (需要下载roco-contacts项目，并且和此项目目录同级)
npm run build

# build for production 
npm run build_old

```

## 相关文档

[React](https://react.docschina.org/)  (用于构建用户界面的 JavaScript 库)

[UmiJS](https://umijs.org/zh/)  (中文可发音为乌米，是一个可插拔的企业级 react 应用框架)

[DvaJS](https://dvajs.com/) （数据流前端框架）

[Ant Design](https://ant-design.gitee.io/docs/react/introduce-cn) （antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品）

[Ant Design Pro](https://v2-pro.ant.design/docs/getting-started-cn) （是一个企业级中后台前端/设计解决方案）

[umi-request](https://github.com/umijs/umi-request/blob/master/README_zh-CN.md) (网络请求库，基于 fetch 封装, 兼具 fetch 与 axios 的特点, )

[Braft Editor](https://github.com/margox/braft-editor#readme) （一个基于draft-js的Web富文本编辑器，适用于React框架，兼容主流现代浏览器。）

## 项目结构
```
├── bin                        
    └── build.sh                 发布命令（ MAC ）
├── config                       路由配置
    └── router.config.ts 
├── src
│   ├── assets                   图片
│   │   ├── ...             
│   │   └── ...           
│   ├── components               组件
│   │   ├── ...             
│   │   └── ...  
│   ├── config                   
│   │   ├── axios                (项目暂时没有引用)             
│   ├── constants                常量文件
│   │   ├── ...             
│   │   └── ... 
│   ├── extends                  继承的方法
│   │   ├── ...             
│   │   └── ... 
│   ├── layouts                  全局布局，在路由外面套的一层路由
│   │   ├── ...             
│   │   └── ... 
│   ├── locales                  国际化
│   │   ├── ...             
│   │   └── ...
│   ├── models                   dva
│   │   ├── ...             
│   │   └── ... 
│   ├── pages                    实际页面
│   │   ├── ...             
│   │   └── ... 
│   ├── service                  请求的接口API文件
│   │   ├── ...             
│   │   └── ...
│   ├── ts                       TS
│   │   ├── ...             
│   │   └── ... 
│   ├── utils                    工具方法
│   │   ├── ...             
│   │   └── ...

│   ├── app.ts                   运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。

├── .umirc.ts                    umi配置文件
└── README.md
```
##  整体项目搭建过程

### 1、yarn create umi
### 2、先搭建layouts
### 3、SiderMenu,路由
### 4、header
### 5、content
### 6、外层Tab
### 7、内层Tab
### 8、相关配置（请求、权限、面包屑...）
### 9、.......

##  注意事项

1、⚠️[React 的 PureComponent Vs Component](https://www.jianshu.com/p/c41bbbc20e65)

## 开发遇到的问题与解决方案

|编号| 问题  | 描述 | 解决方案 |
|:--:| ----- | ---- | -------- |
| 1 | 组件传参 |父级参数有变化，子组件接收不到或者没有变化  | PureComponent --> Component |
| 2 |  |  |  |

## 待开发
### 1、table组件化
## 未完待续...
