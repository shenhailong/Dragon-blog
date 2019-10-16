'use strict';

const Service = require('egg').Service;
const uuid = require('uuid');
class UserService extends Service {
  // 注册，先判断是否已经存在，之后在创建
  async register(user) {
    const { ctx } = this;
    const queryResult = await this.hasRegister(user.username);
    if (queryResult) {
      ctx.returnBody({
        message: '用户名已存在',
        code: '0',
        success: false,
      });
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
    ctx.returnBody({
      message: '注册成功',
      code: '1',
      data: userInfo.dataValues,
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
      ctx.returnBody({
        message: '用户不存在',
        code: '0',
        success: false,
      });
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
        // 更新用户token
        await this.updateUser(user.username, {
          token: newToken,
        });
        const newUserInfo = await this.getUserByUserName(user.username);
        ctx.returnBody({
          message: '登陆成功',
          data: newUserInfo.dataValues,
        });
      } else {
        ctx.returnBody({
          message: '密码错误',
          code: '0',
          success: false,
        });
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
