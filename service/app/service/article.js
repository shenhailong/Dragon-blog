'use strict';

const Service = require('egg').Service;
class ArticleService extends Service {
  // 创建 //TODO 需要考虑失败的情况，暂时先往下走
  async create(data) {
    const { ctx } = this;
    await ctx.model.Article.create(data);
    ctx.returnBody({});
  }
}

module.exports = ArticleService;
