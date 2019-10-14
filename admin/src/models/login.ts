import { routerRedux } from 'dva/router';
import { Model } from 'dva';
import { doLogin } from '@/services/login';
import { ResponseModel } from '@/models/response';
import { ResponseSuccess } from '@/constants/response'
import { UserModel } from '@/models/user';
import { getPageQuery } from '@/utils/utils';
import { setAuthority } from '@/utils/authority';

export default {
  namespace: 'login',
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
      const res: ResponseModel<any> = yield call(doLogin, payload);
      // TODO: 这里不转换一下类型，ts还一直报错，待查
      if (String(res.data.code) === String(ResponseSuccess)) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            currentAuthority: 'admin'
          },
        });
        const loginInfo = res.data.data;
        // 需在umi.ts中定义常量才可以
        const TOKEN_KEY = process.env.TOKEN_KEY as string;
        // const token = loginInfo.accessToken.accessToken;
        // window.localStorage.setItem(TOKEN_KEY, loginInfo);
        window.localStorage.setItem('user', JSON.stringify(loginInfo));

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  }
} as Model;

export interface LoginFormModel {
  username: string;
  password: string;
  remember: boolean;
}
