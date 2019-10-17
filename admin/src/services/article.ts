// 分类
import request from '@/utils/request';
import { Article } from  '@/ts/article';

// 列表
export async function list(params: {
  offset: number;
  limit: number;
}) {
  return request(`/api/v1/article`, {
    params
  });
}
