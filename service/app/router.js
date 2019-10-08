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
   * @describe 登陆、注册
   */
  // 注册
  apiV1Router.post('/login/register', controller.home.index);
};
