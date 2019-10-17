'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, TEXT, INTEGER, DATE, BOOLEAN } = Sequelize;
    return await queryInterface.createTable('article', {
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
      category: {
        type: INTEGER,
        allowNull: false,
      },
      status: {
        type: STRING(30),
        allowNull: false,
      },
      isOriginal: {
        type: BOOLEAN,
        allowNull: false,
      },
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('article');
  },
};
