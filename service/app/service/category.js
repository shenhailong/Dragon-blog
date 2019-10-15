'use strict';

const Service = require('egg').Service;
class CategoryService extends Service {
  async create(data) {
    const { ctx } = this;
    const category = await this.getCategoryByName(data.name);
    if (category) {
      ctx.returnBody(200, '名称已经存在', '0', {}, false);
      return;
    }
    await ctx.model.Category.create(data);
    ctx.returnBody(200, '创建成功', '1');
  }

  async getCategoryByName(name) {
    return await this.ctx.model.Category.findOne({
      where: {
        name,
      },
    });
  }
}

module.exports = CategoryService;
