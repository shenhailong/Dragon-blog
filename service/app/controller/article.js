'use strict';
const Controller = require('egg').Controller;

class ArticleController extends Controller {
  // 列表
  async index() {
    const { ctx } = this;
    const { limit, offset } = ctx.request.body;
    await ctx.service.article.index({ limit, offset });
  }
  // 创建
  async create() {
    const { ctx } = this;
    await ctx.service.article.create(ctx.request.body);
  }
  // 详情
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.article.show(id);
  }

  // 编辑
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, order, status } = ctx.request.body;
    await ctx.service.article.update(id, { name, order, status });
  }

  // 删除
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.article.destroy(id);
  }
}

module.exports = ArticleController;
