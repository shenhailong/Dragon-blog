'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    ctx.body = 'hi, login';
  }
}

module.exports = LoginController;
