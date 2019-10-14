import { queryList, queryDetail, edit, add, remove } from '@/services/comment';
import { message } from 'antd';
import { Effect } from 'dva';
import { Reducer } from 'redux';
import { ResponseSuccess } from '@/constants/response';
import { editData } from  '@/ts/employee';

export interface CommentModelState {
  total: number;
  list: [];
  comment: [];
}

export interface CommentModelType {
  namespace: 'comment';
  state: CommentModelState;
  effects: {
    fetch: Effect;
    add: Effect;
    remove: Effect;
    fetchDetail: Effect;
    edit: Effect;
  };
  reducers: {
    save: Reducer<editData>;
    add: Reducer<editData>;
    detail: Reducer<editData>;
  };
}

const Model: CommentModelType = {
  namespace: 'comment',

  state: {
    total: 0,
    list: [],
    comment: []
  },

  effects: {
    // 获取列表
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      if(response.code === ResponseSuccess){
        yield put({
          type: 'save',
          payload: {
            list: response.data.rows,
            total: response.data.count
          },
        });
      }
    },
    // 新增
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if(response.code === ResponseSuccess){
        message.success('添加成功');
        if (callback) callback();
        const res = yield call(queryList);
        yield put({
          type: 'save',
          payload: {
            list: res.data.rows,
            total: res.data.count
          }
        });
      }
    },
    // 删除
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      if(response.code === ResponseSuccess){
        message.success('删除成功');
        const res = yield call(queryList);
        yield put({
          type: 'save',
          payload: {
            list: res.data.rows,
            total: res.data.count
          }
        });
      }
    },
    // 获取详情
    *fetchDetail({ payload, callback }, { call, put }) {
      const response = yield call(queryDetail, payload);
      if(response.code === ResponseSuccess){
        yield put({
          type: 'detail',
          payload: {
            data: response.data,
            key: payload
          }
        });
        if (callback) callback();
      }
    },
    // 编辑
    *edit({ payload, callback }, { call, put }) {
      const response = yield call(edit, payload.id, payload.data);
      if(response.code === ResponseSuccess){
        message.success('提交成功');
        if (callback) callback();
        const res = yield call(queryList);
        yield put({
          type: 'save',
          payload: {
            list: res.data.rows,
            total: res.data.count
          }
        });
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
