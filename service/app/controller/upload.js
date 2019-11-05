'use strict';
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    await this.ctx.service.upload.upload(this.ctx.request.files.filename, this.ctx.request.files[0].filepath);
  }
}

module.exports = UploadController;
