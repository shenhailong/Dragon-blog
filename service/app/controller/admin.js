'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    const ctx = this.ctx;
    await ctx.render('admin');
  }
}

module.exports = AdminController;
