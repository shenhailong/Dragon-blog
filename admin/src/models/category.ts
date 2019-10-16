import { list, add, edit, detail, remove } from '@/services/category';
import { message } from 'antd';
import { Effect } from 'dva';
import { Reducer } from 'redux';
import { ResponseSuccess } from '@/constants/response';
import { Category } from  '@/ts/category';
export interface CategoryModelState {
  total: number;
  list: [];
  title: [];
}

export interface CategoryModelType {
  namespace: 'category';
  state: CategoryModelState;
  effects: {
    list: Effect;
    add: Effect;
    remove: Effect;
    detail: Effect;
    edit: Effect;
  };
  reducers: {
    save: Reducer<Category>;
  };
}

const Model: CategoryModelType = {
  namespace: 'category',

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
