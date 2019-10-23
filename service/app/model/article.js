'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE, NOW, BOOLEAN } = app.Sequelize;
  const Article = app.model.define('article', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(50),
      allowNull: false,
    },
    keyword: {
      type: STRING(20),
      allowNull: false,
    },
    content: {
      type: TEXT,
      allowNull: false,
    },
    img: {
      type: STRING(255),
      allowNull: true,
    },
    categoryId: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: STRING(30),
      allowNull: false,
    },
    remark: {
      type: STRING(100),
      allowNull: true,
    },
    isOriginal: {
      type: BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      defaultValue: NOW,
    },
    updatedAt: {
      type: DATE,
      defaultValue: NOW,
    },
  }, {
    freezeTableName: true,
  });
  return class extends Article {
    static associate() {
      app.model.Article.belongsTo(app.model.Category, {
        foreignKey: 'categoryId',
        targetKey: 'id',
      });
    }
  };
};
