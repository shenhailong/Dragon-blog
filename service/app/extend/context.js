'use strict';
module.exports = {
  /**
   * 返回客户端内容
   * @param {Number} status // 返回状态
   * @param {String} message // 返回内容
   * @param {any} data // 返回内容
   */
  returnBody(status, message, data = {}) {
    this.status = status;
    this.body = {
      data,
      message,
      success: true,
    };
  },
};
