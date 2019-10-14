import request from '@/utils/request';
import { editData } from  '@/ts/employee';
// 职务列表
export async function queryList(params?: any) {
  return request('/api/title', {
    params
  });
}

// 员工全部职务列表
export async function queryTitleAll() {
  return request('/api/title/all');
}

// 职务详情
export async function queryDetail(id: number | string) {
  return request(`/api/title/${id}`);
}

// 编辑
export async function edit(id: number | string, data: editData) {
  return request(`/api/title/${id}`, {
    method: 'PUT',
    data
  });
}

// 新增
export async function add(data: editData) {
  return request(`/api/title`, {
    method: 'POST',
    data
  });
}

// 删除
export async function remove(id: number | string) {
  return request(`/api/title/${id}`, {
    method: 'DELETE'
  });
}
