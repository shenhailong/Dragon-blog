'use strict';

const Service = require('egg').Service;
const uuid = require('uuid');
class UserService extends Service {
  async register(user) {
    const { ctx } = this;
    // 生成唯一码
    user.userId = uuid.v4().replace(/-/g, '');
    const queryResult = await this.hasRegister(user.email);
    if (queryResult) {
      ctx.body = 200;
      ctx.body = {
        msg: '占用',
      };
      return;
    }
    // 没有就创建
    const userInfo = await ctx.model.User.create(user);
    ctx.body = 200;
    ctx.body = {
      msg: '注册成功',
      userId: user.userId,
    };
    return userInfo.dataValues;
  }

  // 判断是否已经注册过
  async hasRegister(email) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({
      where: {
        email,
      },
    });
    if (user && user.dataValues.userId) {
      return true;
    }
    return false;
  }
}

module.exports = UserService;
