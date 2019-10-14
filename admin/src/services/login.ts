import request from '@/utils/request';

import { ResponseModel } from '@/models/response';
import { LoginFormModel } from '@/models/login';

export async function doLogin(data: LoginFormModel) {
  return new Promise(res =>
    setTimeout(() => {
      res({
        data: {
          code: 1,
          data: {
            name: '超级管理员'
          }
        }
      });
    }, 1000),
  );
  // return request(`/api/login`, {
  //   method: 'POST',
  //   data
  // });
}
