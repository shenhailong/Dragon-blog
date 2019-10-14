'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  const User = app.model.define('users', {
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
    avatarUrl: {
      type: STRING(255),
      defaultValue: 'https://mirror-gold-cdn.xitu.io/168e092e37071588c3d?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
    },
    abstract: {
      type: STRING(255),
      allowNull: true,
    },
    sex: {
      type: INTEGER,
      defaultValue: 0,
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
  return User;
};
