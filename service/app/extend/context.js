'use strict';
module.exports = {
  /**
   * 返回客户端内容
   * @param {Number} status // 返回状态码
   * @param {String} message // 返回内容
   * @param {Number} code // code
   * @param {any} data // 返回内容
   */
  returnBody(status, message, code = '1', data = {}) {
    this.status = status;
    this.body = {
      code,
      data,
      message,
      success: true,
    };
  },
};
