import { AxiosResponse } from 'axios';

export interface ResponseModel<T> extends AxiosResponse<ServerResponseModel<T>> {}
/**
 * 返回对象
 * code
 * data
 * message
 */
export interface ServerResponseModel<T> {
  code: ResponseCodeType;
  data: T;
  message: string;
}

/**
 * 返回值
 * 0 失败
 * 1 成功
 * 403 需登录
 * 2 特殊逻辑
 * 3 特殊逻辑
 * 可根据需要继续添加
 */
export type ResponseCodeType = '0' | '1' | '403' | '2' | '3';
