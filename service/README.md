# service

blog service

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

egg.js post 提交会默认有安全防攻击
csrf 跨站请求伪造

password 存储用户密码，需要存储加密后
登陆，使用用户输入的密码，和同样的加密方式，将两个加密后的字符串比较