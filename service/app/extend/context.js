'use strict';
module.exports = {
  /**
   * 返回客户端内容
   * @param {Number} status // 返回状态码
   * @param {String} message // 返回内容
   * @param {String} code // code
   * @param {any} data // 返回内容
   * @param {Boolean} success // 成功与否
   */
  returnBody(status, message, code = '1', data = {}, success = true) {
    this.status = status;
    this.body = {
      code,
      data,
      message,
      success,
    };
  },
};
