import { list, add, edit, detail, remove, status } from '@/services/article';
import { message } from 'antd';
import { Effect } from 'dva';
import { Reducer } from 'redux';
import { ResponseSuccess } from '@/constants/response';
import { Article } from  '@/ts/article';
export interface ArticleModelState {
  total: number;
  list: [];
  title: [];
}

export interface ArticleModelType {
  namespace: 'article';
  state: ArticleModelState;
  effects: {
    list: Effect;
    add: Effect;
    remove: Effect;
    detail: Effect;
    edit: Effect;
    status: Effect;
  };
  reducers: {
    save: Reducer<Article>;
  };
}

const Model: ArticleModelType = {
  namespace: 'article',

  state: {
    total: 0,
    list: [],
    title: []
  },

  effects: {
    // 获取列表
    *list({ payload }, { call, put }) {
      const res = yield call(list, payload);
      if(res.code === ResponseSuccess){
        yield put({
          type: 'save',
          payload: {
            list: res.data.rows,
            total: res.data.count
          },
        });
      }
    },
    // 新增
    *add({ payload, callback }, { call, put }) {
      const res = yield call(add, payload);
      if(res.code === ResponseSuccess){
        message.success('添加成功');
        if (callback) callback();
      }
    },
    // 编辑
    *edit({ payload, callback }, { call, put }) {
      const response = yield call(edit, payload.id, payload.data);
      if(response.code === ResponseSuccess){
        message.success('提交成功');
        if (callback) callback();
      }
    },
    // 详情
    *detail({ payload, callback }, { call, put }) {
      const res = yield call(detail, payload);
      if(res.code === ResponseSuccess){
        callback(res.data)
      }
    },
    // 删除
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      if(response.code === ResponseSuccess){
        message.success('删除成功');
        if (callback) callback();
      }
    },
    // 改变状态
    *status({ payload, callback }, { call, put }) {
      const response = yield call(status, payload.id, payload.data);
      if(response.code === ResponseSuccess){
        message.success('成功');
        if (callback) callback();
      }
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.list,
        total: action.payload.total,
      };
    }
  }
};

export default Model;
