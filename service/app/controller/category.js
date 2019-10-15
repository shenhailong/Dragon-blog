'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  // 创建
  async create() {
    const { ctx } = this;
    const { name, order, status } = ctx.request.body;
    await ctx.service.category.create({ name, order, status });
  }

}

module.exports = CategoryController;
