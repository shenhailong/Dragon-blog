// 分类
import request from '@/utils/request';
import { Category } from  '@/ts/category';

// 列表
export async function list(params: {
  offset: number;
  limit: number;
}) {
  return request(`/api/v1/category`, {
    params
  });
}

// 所有开启的列表
export async function all() {
  return request(`/api/v1/category/all`);
}

// 新增
export async function add(data: Category) {
  return request(`/api/v1/category`, {
    method: 'POST',
    data
  });
}

// 编辑
export async function edit(id: number | string, data: Category) {
  return request(`/api/v1/category/${id}`, {
    method: 'PUT',
    data
  });
}

// 详情
export async function detail(id: string) {
  return request(`/api/v1/category/${id}`);
}

// 删除
export async function remove(id: number | string) {
  return request(`/api/v1/category/${id}`, {
    method: 'DELETE'
  });
}
