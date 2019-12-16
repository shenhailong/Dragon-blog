'use strict';

// 阿里oss上传
const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI4FgtZGvFaizbT4rECxhm',
  accessKeySecret: 'i7icaxxiP1ltNvhSDgCoD7qNyEYwfP',
  bucket: 'dragon-blog',
});

const Service = require('egg').Service;
class UploadService extends Service {
  // 上传
  async upload(filename, data) {
    const { ctx } = this;
    const localFile = data;
    try {
      // filename表示上传到OSS的Object名称，localFile表示本地文件或者文件路径
      const res = await client.put(filename, localFile);
      console.log(res);
      if (res.res.statusCode === 200) {
        ctx.returnBody({
          data: {
            path: res.url,
          },
        });
      } else {
        console.log(res.res.statusCode);
        console.log(res);
        ctx.returnBody({
          message: res.res.statusMessage,
          code: '0',
          success: false,
        });
      }
    } catch (err) {
      console.error('error: %j', err);
    }
  }
}

module.exports = UploadService;
