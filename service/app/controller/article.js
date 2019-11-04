'use strict';
const Controller = require('egg').Controller;

class ArticleController extends Controller {
  // 列表
  async index() {
    const { ctx } = this;
    const {
      limit = 10,
      offset = 0,
      status,
      isOriginal,
      title,
      categoryId,
      keyword,
      createdAt,
    } = ctx.query;
    const offsetNum = parseInt(offset);
    const limitNum = parseInt(limit);
    await ctx.service.article.index({ limit: limitNum, offset: offsetNum, status, isOriginal, title, categoryId, keyword, createdAt });
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
    const {
      title,
      keyword,
      content,
      img,
      categoryId,
      status,
      isOriginal,
      remark,
    } = ctx.request.body;
    console.log(img);
    console.log('?????????????');
    const newImg = JSON.stringify(img);
    console.log(newImg);
    await ctx.service.article.update(id, { title, keyword, content, img: newImg, categoryId, status, isOriginal, remark });
  }

  // 删除
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.article.destroy(id);
  }

  async upload() {
    // console.log(this.ctx.request.files[0]);
    await this.ctx.service.upload.upload(this.ctx.request.files.filename, this.ctx.request.files[0].filepath);
  }
}

module.exports = ArticleController;
