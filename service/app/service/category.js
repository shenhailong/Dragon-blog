'use strict';

const Service = require('egg').Service;
class CategoryService extends Service {
  // 列表
  async index(data) {
    const { ctx } = this;
    const list = await this.getCategoryList(data);
    ctx.returnBody({
      data: list,
    });
  }
  // 列表(开启状态全部)
  async all() {
    const { ctx } = this;
    const list = await this.getAllCategoryList();
    ctx.returnBody({
      data: list,
    });
  }
  // 创建
  async create(data) {
    const { ctx } = this;
    const category = await this.getCategoryByName(data.name);
    if (category) {
      ctx.returnBody({
        message: '名称已经存在',
        code: '0',
        success: false,
      });
      return;
    }
    await ctx.model.Category.create(data);
    ctx.returnBody({});
  }

  // 编辑
  async update(id, data) {
    const { ctx } = this;
    const category = await this.getCategoryByName(data.name);
    if (category && (category.dataValues.id !== id)) {
      ctx.returnBody({
        message: '名称已经存在',
        code: '0',
        success: false,
      });
    }
    await this.ctx.model.Category.update(data, {
      where: {
        id,
      },
    });
    ctx.returnBody({});
  }

  // 详情
  async show(id) {
    const { ctx } = this;
    const detail = await this.getCategoryById(id);
    ctx.returnBody({
      data: detail,
    });
  }

  // 删除
  async destroy(id) {
    const { ctx } = this;
    await this.ctx.model.Category.destroy({
      where: {
        id,
      },
    });
    ctx.returnBody({});
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

  // 获取所有开启的列表数据
  async getAllCategoryList() {
    return await this.ctx.model.Category.findAll({
      where: {
        status: 1,
      },
    });
  }
}

module.exports = CategoryService;
