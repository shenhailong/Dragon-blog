'use strict';
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    await this.ctx.service.uploadAli.upload(this.ctx.request.files[0].filename, this.ctx.request.files[0].filepath);
  }
}

module.exports = UploadController;
