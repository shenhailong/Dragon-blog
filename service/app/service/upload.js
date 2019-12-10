'use strict';
const qiniu = require('qiniu');
const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z1;
const accessKey = '-7F1P-t3fU0cMmBVuSIHp17ISntcWQQcLYbAddSw';
const secretKey = 'dWFQOrO1N80zcISXlKbXBc2_lhuwp8EZw--XiWpn';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: 'dragon-blog',
  expires: 864000,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);


const Service = require('egg').Service;
class UploadService extends Service {
  // 上传
  async upload(filename, data) {
    const { ctx } = this;
    const localFile = data;
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    const key = filename;
    // 文件上传
    await new Promise(function(resolve, reject) {
      formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr,
        respBody, respInfo) => {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode === 200) {
          ctx.returnBody({
            data: {
              path: 'http://dragon-cn.qiniudns.com/' + respBody.key,
            },
          });
          resolve();
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
          ctx.returnBody({
            message: respBody,
            code: '0',
            success: false,
          });
          reject(respInfo.statusCode);
        }
      });
    });
  }
}

module.exports = UploadService;
