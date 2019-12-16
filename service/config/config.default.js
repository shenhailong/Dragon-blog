/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568968314404_4437';

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.multipart = {
    mode: 'file',
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // add your middleware config here
  config.middleware = [ 'jwt' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.jwt = {
    enable: true,
    ignore: [ '/sign/in' ], // 那些请求不需要认证
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    password: '12345678',
    database: 'blog',
    define: {
      underscored: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
