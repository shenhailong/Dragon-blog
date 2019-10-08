'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 为了以后router增多
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};
