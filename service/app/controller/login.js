'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    const { password, username, email } = ctx.request.body;
    ctx.body = password + username + email;
    await ctx.service.user.register({ password, username, email });
  }
}

module.exports = LoginController;
