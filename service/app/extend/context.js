'use strict';
module.exports = {
  /**
   * 返回客户端内容
   * @param {
   *  Object: {
   *    status: number; 状态码
   *    message: string, 提示信息
   *    code: string, code
   *    data: object, 数据
   *    success: boolean, 成功与否
   *  }
   * } data // 返回状态码
   */
  returnBody({ status = 200, message = 'success', code = '1', data = {}, success = true }) {
    this.status = status;
    this.body = {
      code,
      data,
      message,
      success,
    };
  },
};
