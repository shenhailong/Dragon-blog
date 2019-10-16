'use strict';

const Service = require('egg').Service;
class CategoryService extends Service {
  // 列表
  async index(data) {
    const { ctx } = this;
    const list = await this.getCategoryList(data);
    ctx.returnBody(200, 'success', '1', list);
  }
  // 创建
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

  // 编辑
  async update(id, data) {
    console.log(data)
    const { ctx } = this;
    const category = await this.getCategoryByName(data.name);
    if (category && (category.dataValues.id !== id)) {
      ctx.returnBody(200, '名称已经存在', '0', {}, false);
    }
    await this.ctx.model.Category.update(data, {
      where: {
        id,
      },
    });
    ctx.returnBody(200, '编辑成功', '1');
  }

  // 详情
  async show(id) {
    const { ctx } = this;
    const detail = await this.getCategoryById(id);
    ctx.returnBody(200, 'success', '1', detail);
  }

  // 根据id获取
  async getCategoryById(id) {
    return await this.ctx.model.Category.findOne({
      where: {
        id,
      },
    });
  }

  // 根据名称获取
  async getCategoryByName(name) {
    return await this.ctx.model.Category.findOne({
      where: {
        name,
      },
    });
  }

  // 获取列表数据
  async getCategoryList(query) {
    return await this.ctx.model.Category.findAndCountAll({
      query,
    });
  }
}

module.exports = CategoryService;
