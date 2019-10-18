import { Category } from './category';

// 分类管理
export interface Article {
  id?: string | number;
  title: string;
  keyword: string;
  status?: boolean;
  remark?: string;
  isOriginal: boolean;
  category: Category;
}
