'use strict';

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// 创建token
exports.createToken = (data, expires = 7200) => {
  const exp = Math.floor(Date.now() / 1000) + expires;
  const cert = fs.readFileSync(
    path.join(__dirname, './../files/ssh-key/rsa_private_key.pem')
  ); // 私钥，看后面生成方法

  const token = jwt.sign({ data, exp }, cert, { algorithm: 'RS256' });
  return token;
};

// 解密，验证
exports.verifyToken = token => {
  const cert = fs.readFileSync(
    path.join(__dirname, './../files/ssh-key/rsa_public_key.pem')
  ); // 公钥，看后面生成方法
  let res = '';

  try {
    const result = jwt.verify(token, cert, { algorithms: [ 'RS256' ] }) || {};
    const { exp } = result,
      current = Math.floor(Date.now() / 1000);
    res = result.data || {};
    current <= exp ? (result.data.exp = false) : (result.data.exp = true);
  } catch (e) {
    console.log(e);
  }
  return res;
};

