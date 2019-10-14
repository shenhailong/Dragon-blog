'use strict';
const fs = require('fs');
const path = require('path');
const JSEncrypt = require('node-jsencrypt');

/**
 * Encrypt with the public key...
 * @param {String} text 传入需要加密的字符串
 * @return {String} encrypted 返回加密后的字符串
 */
exports.rsaEncrypt = text => {
  // _pubicKey 获取加密公钥
  const _pubicKey = fs.readFileSync(
    path.join(__dirname, './../files/ssh-key/rsa_public_key.pem')
  );
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(_pubicKey.toString());
  const encrypted = encrypt.encrypt(text);
  return encrypted;
};


/**
 * Decrypt with the private key...
 * @param {String} cipherText 需要解密的密文
 * @return {String} decrypted 返回解密后的字符串
 */
exports.rsaDecrypt = cipherText => {
  const _privateKey = fs.readFileSync(
    path.join(__dirname, './../files/ssh-key/rsa_private_key.pem')
  ); // 公钥，看后面生成方法
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(_privateKey.toString());
  const decrypted = decrypt.decrypt(cipherText);
  return decrypted;
};


/**
 * get publicKey
 * @return {String} key 公钥
 */
exports.getPublicKey = () => {
  let _publicKey = fs.readFileSync(
    path.join(__dirname, './../files/ssh-key/rsa_public_key.pem')
  );
  _publicKey = _publicKey.toString();
  _publicKey = _publicKey.split('\r\n');
  _publicKey = _publicKey.join('');
  console.log(_publicKey.toString());
  return _publicKey.toString();
};
