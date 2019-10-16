import { list, add, edit, detail } from '@/services/category';
import { message } from 'antd';
import { Effect } from 'dva';
import { Reducer } from 'redux';
import { ResponseSuccess } from '@/constants/response';
import { editData } from  '@/ts/category';
import { type } from 'os';

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
    // remove: Effect;
    detail: Effect;
    edit: Effect;
  };
  reducers: {
    save: Reducer<editData>;
    add: Reducer<editData>;
    detail: Reducer<editData>;
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
        // const res = yield call(queryDepartment);
        // yield put({
        //   type: 'save',
        //   payload: {
        //     list: res.data,
        //     total: res.data.count
        //   }
        // });
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
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.list,
        total: action.payload.total,
      };
    },
    add(state, action) {
      return {
        ...state,
        [action.payload.key]: action.payload.data
      };
    },
    // FIXME: 这里考虑是否需要优化（现在所有数据都放到state），考虑拆分不同namespace，或者直接把数据写到业务页面
    detail(state, action) {
      return {
        ...state,
        [action.payload.key]: action.payload.data
      };
    }
  }
};

export default Model;
