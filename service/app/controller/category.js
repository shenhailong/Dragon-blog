'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  // 列表
  async index() {
    const { ctx } = this;
    const { limit, offset } = ctx.request.body;
    await ctx.service.category.index({ limit, offset });
  }
  // 创建
  async create() {
    const { ctx } = this;
    const { name, order, status } = ctx.request.body;
    await ctx.service.category.create({ name, order, status });
  }
  // 详情
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.category.show(id);
  }

  // 详情
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, order, status } = ctx.request.body;
    await ctx.service.category.update(id, { name, order, status });
  }

}

module.exports = CategoryController;
