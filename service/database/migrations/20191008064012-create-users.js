'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, DATE } = Sequelize;
    return await queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: STRING(255),
        allowNull: false,
      },
      username: {
        type: STRING(255),
        allowNull: false,
      },
      email: {
        type: STRING(255),
        allowNull: false,
      },
      token: {
        type: STRING(512),
        allowNull: true,
      },
      password: {
        type: STRING(255),
        allowNull: false,
      },
      mobile: STRING(32),
      prefix: STRING(32),
      avatarUrl: STRING(255),
      abstract: {
        type: STRING(255),
        allowNull: true,
      },
      sex: {
        type: INTEGER,
        defaultValue: 0,
      },
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('users');
  },
};
