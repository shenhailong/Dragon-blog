// 分类
import request from '@/utils/request';
import { editData } from  '@/ts/department';

// 新增
export async function add(data: editData) {
  return request(`/api/v1/category`, {
    method: 'POST',
    data
  });
}


