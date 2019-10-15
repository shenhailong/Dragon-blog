'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 版本
  const apiV1Router = router.namespace('/api/v1');
  apiV1Router.get('/', controller.home.index);
  /**
   * @param *
   * @describe 登陆、注册相关
   */
  // 注册
  apiV1Router.post('/sign/signUp', controller.sign.signUp);
  // 登陆
  apiV1Router.post('/sign/signIn', controller.sign.signIn);
  // 获取公钥
  apiV1Router.get('/sign/getPublicKey', controller.sign.getPublicKey);

  /**
   * @param *
   * @describe 分类
   */
  // 创建分类
  apiV1Router.resources('category', '/category', controller.category);
};
