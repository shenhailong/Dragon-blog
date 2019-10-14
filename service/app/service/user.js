'use strict';

const Service = require('egg').Service;
const uuid = require('uuid');
class UserService extends Service {
  // 注册，先判断是否已经存在，之后在创建
  async register(user) {
    const { ctx } = this;
    const queryResult = await this.hasRegister(user.username);
    if (queryResult) {
      ctx.returnBody(200, '用户名已存在');
      return;
    }
    // 生成token
    const newToken = ctx.helper.token.createToken({
      username: user.username,
      password: user.password,
    });
    // 生成唯一码
    user.userId = uuid.v4().replace(/-/g, '');
    user.token = newToken;
    const userInfo = await ctx.model.User.create(user);
    ctx.returnBody(200, '注册成功', {
      ...userInfo.dataValues,
    });
  }

  // 判断是否已经注册过
  async hasRegister(username) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({
      where: {
        username,
      },
    });
    if (user && user.dataValues.userId) {
      return true;
    }
    return false;
  }

  // 登陆
  async signIn(user) {
    const { ctx } = this;
    const userInfo = await this.getUserByUserName(user.username);
    if (!userInfo) {
      ctx.returnBody(200, '用户不存在');
      return;
    }
    if (userInfo.dataValues.password) {
      const passInDatabase = ctx.helper.encrypt.rsaDecrypt(userInfo.dataValues.password); // 数据库解密后的密码
      const passInput = ctx.helper.encrypt.rsaDecrypt(user.password); // 用户输入解密后的密码
      if (passInDatabase === passInput) {
        const newToken = ctx.helper.token.createToken({
          username: user.username,
          password: user.password,
        });
        await this.updateUser(user.username, {
          token: newToken,
        });
        ctx.returnBody(200, '登陆成功', {
          token: newToken,
        });
      } else {
        ctx.returnBody(200, '密码错误');
      }
    }
  }

  // 更新用户token
  async updateUser(username, data = {}) {
    return await this.ctx.model.User.update(data, {
      where: {
        username,
      },
    });
  }

  // 根据用户名查找用户
  async getUserByUserName(username) {
    return await this.ctx.model.User.findOne({
      where: {
        username,
      },
    });
  }
}

module.exports = UserService;
