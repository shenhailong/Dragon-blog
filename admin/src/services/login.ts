import request from '@/utils/request';
import { LoginFormModel } from '@/ts/login';

export async function doLogin(data: LoginFormModel) {
  return request(`/api/v1/sign/signIn`, {
    method: 'POST',
    data
  });
}

export async function getPublicKey() {
  return await request(`/api/v1/sign/getPublicKey`);
}
