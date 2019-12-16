'use strict';

const Controller = require('egg').Controller;

class PcController extends Controller {
  async index() {
    const ctx = this.ctx;
    await ctx.render('pc');
  }
}

module.exports = PcController;
