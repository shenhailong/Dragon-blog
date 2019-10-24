import { Category } from './category';

// 分类管理
export interface Article {
  id?: string | number;
  title: string;
  keyword: string;
  status: string;
  remark?: string;
  isOriginal: boolean;
  content: string;
  categoryId: string | number;
}
