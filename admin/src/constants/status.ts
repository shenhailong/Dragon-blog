export interface Status {
  [key: string]: string
}
// 预约状态
export const ARTICLE_STATUS: Status = {
  DRAFT: '草稿',
  LIST: '发布',
  DELIST: '下架'
}

const DRAFT = 'DRAFT' // 草稿
const LIST = 'LIST' // 发布
const DELIST = 'DELIST' // 下架
export {
  DRAFT,
  LIST,
  DELIST
}
