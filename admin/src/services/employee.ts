import request from '@/utils/request';
import { editData } from  '@/ts/employee';
// 员工列表
export async function queryList(params?: any) {
  return request('/api/employee', {
    params
  });
}

// 员工详情
export async function queryDetail(id: number | string) {
  return request(`/api/employee/${id}`);
}

// 编辑
export async function edit(id: number | string, data: editData) {
  return request(`/api/employee/${id}`, {
    method: 'PUT',
    data
  });
}

// 新增
export async function add(data: editData) {
  return request(`/api/employee`, {
    method: 'POST',
    data
  });
}

// 删除
export async function remove(id: number | string) {
  return request(`/api/employee/${id}`, {
    method: 'DELETE'
  });
}
