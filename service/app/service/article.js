'use strict';

const Service = require('egg').Service;
const status = require('../constant/status');
class ArticleService extends Service {
  // 列表
  async index(data) {
    const { ctx } = this;
    const list = await this.getList(data);
    ctx.returnBody({
      data: list,
    });
  }
  // 创建 //TODO 需要考虑失败的情况，暂时先往下走
  async create(data) {
    const { ctx } = this;
    // 创建是草稿状态
    data.status = status.publish_status.draft;
    await ctx.model.Article.create(data);
    ctx.returnBody({});
  }

  // 获取列表数据
  async getList(query) {
    return await this.ctx.model.Article.findAndCountAll({
      query,
    });
  }
}

module.exports = ArticleService;
