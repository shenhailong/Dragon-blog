import request from '@/utils/request';
import { editData } from  '@/ts/department';
// 列表
export async function queryList(params?: any) {
  return request('/api/comment', {
    params
  });
}

// 详情
export async function queryDetail(id: number | string) {
  return request(`/api/comment/${id}`);
}

// 编辑
export async function edit(id: number | string, data: editData) {
  return request(`/api/comment/${id}`, {
    method: 'PUT',
    data
  });
}

// 新增
export async function add(data: editData) {
  return request(`/api/comment`, {
    method: 'POST',
    data
  });
}

// 删除
export async function remove(id: number | string) {
  return request(`/api/comment/${id}`, {
    method: 'DELETE'
  });
}
