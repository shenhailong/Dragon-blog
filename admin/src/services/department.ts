import request from '@/utils/request';
import { editData } from  '@/ts/department';
// 分页部门列表
export async function queryDepartment(params?: any) {
  return request('/api/department/hierarchy', {
    params
  });
}

// 全部部门列表
export async function queryDepartmentAll() {
  return request('/api/department/all');
}

// 部门详情
export async function queryDetail(id: number | string) {
  return request(`/api/department/${id}`);
}

// 编辑
export async function edit(id: number | string, data: editData) {
  return request(`/api/department/${id}`, {
    method: 'PUT',
    data
  });
}

// 新增
export async function add(data: editData) {
  return request(`/api/department`, {
    method: 'POST',
    data
  });
}

// 删除
export async function remove(id: number | string) {
  return request(`/api/department/${id}`, {
    method: 'DELETE'
  });
}
