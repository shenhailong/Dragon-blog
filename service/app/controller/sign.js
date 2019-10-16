'use strict';

const Controller = require('egg').Controller;

class SignController extends Controller {
  // 注册
  async signUp() {
    const { ctx } = this;
    const { password, username, email } = ctx.request.body;
    await ctx.service.user.register({ password, username, email });
  }

  // 登陆
  async signIn() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    await ctx.service.user.signIn({ username, password });
  }

  // 获取公钥
  async getPublicKey() {
    const { ctx } = this;
    const key = ctx.helper.encrypt.getPublicKey();
    ctx.returnBody({
      data: key,
    });
  }

}

module.exports = SignController;
