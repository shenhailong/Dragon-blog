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

  // 编辑
  async update(id, data) {
    const { ctx } = this;
    console.log(data)
    await this.ctx.model.Article.update(data, {
      where: {
        id,
      },
    });
    ctx.returnBody({});
  }

  // 获取列表数据
  async getList(query) {
    const Op = this.app.Sequelize.Op;
    const obj = {
      status: {
        value: query.status,
        mode: query.status,
      },
      isOriginal: {
        value: query.isOriginal,
        mode: query.isOriginal,
      },
      categoryId: {
        value: query.categoryId,
        mode: query.categoryId,
      },
      title: {
        value: query.title,
        mode: {
          [Op.like]: `%${query.title}%`,
        },
      },
      keyword: {
        value: query.keyword,
        mode: {
          [Op.like]: `%${query.keyword}%`,
        },
      },
      createdAt: {
        value: query.createdAt,
        mode: {
          [Op.gt]: query.createdAt,
        },
      },
    };
    const whereObj = {};
    Object.keys(obj).forEach(item => {
      if (obj[item].value) {
        whereObj[item] = obj[item].mode;
      }
    });
    console.log(whereObj)
    return await this.ctx.model.Article.findAndCountAll({
      where: whereObj,
      include: [
        {
          model: this.app.model.Category,
          as: 'category',
          attributes: [ 'id', 'name' ],
        },
      ],
      offset: query.offset,
      limit: query.limit,
    });
  }

  // 详情
  async show(id) {
    const { ctx } = this;
    const detail = await this.getArticleById(id);
    ctx.returnBody({
      data: detail,
    });
  }

  // 删除
  async destroy(id) {
    const { ctx } = this;
    await this.ctx.model.Article.destroy({
      where: {
        id,
      },
    });
    ctx.returnBody({});
  }

  // 根据id获取
  async getArticleById(id) {
    return await this.ctx.model.Article.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.app.model.Category,
          as: 'category',
          attributes: [ 'id', 'name' ],
        },
      ],
    });
  }

}

module.exports = ArticleService;
