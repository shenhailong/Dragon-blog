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

// 新增
export async function add(data: Article) {
  return request(`/api/v1/article`, {
    method: 'POST',
    data
  });
}

// 编辑
export async function edit(id: number | string, data: Article) {
  return request(`/api/v1/article/${id}`, {
    method: 'PUT',
    data
  });
}

// 详情
export async function detail(id: string) {
  return request(`/api/v1/article/${id}`);
}

// 删除
export async function remove(id: number | string) {
  return request(`/api/v1/article/${id}`, {
    method: 'DELETE'
  });
}
