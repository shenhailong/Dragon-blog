'use strict';

module.exports = (option, app) => {
  return async function Interceptor(ctx, next) {
    const reqUrl = ctx.request.url;
    console.log(reqUrl);
    await next();
  };
};
