'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW, BOOLEAN } = app.Sequelize;
  const Category = app.model.define('category', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(30),
      allowNull: false,
    },
    order: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
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
  return Category;
};
