'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, DATE, BOOLEAN } = Sequelize;
    return await queryInterface.createTable('category', {
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
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('category');
  },
};
