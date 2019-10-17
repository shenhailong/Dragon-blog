'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  // 列表
  async index() {
    const { ctx } = this;
    const { limit = 10, offset = 0 } = ctx.request.body;
    await ctx.service.category.index({ limit, offset });
  }
  // 列表(不分页)
  async all() {
    const { ctx } = this;
    await ctx.service.category.all();
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

  // 编辑
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, order, status } = ctx.request.body;
    await ctx.service.category.update(id, { name, order, status });
  }

  // 删除
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.category.destroy(id);
  }
}

module.exports = CategoryController;
