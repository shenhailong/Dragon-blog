import { queryList, queryDetail, edit, add, remove } from '@/services/title';
import { message } from 'antd';
import { Effect } from 'dva';
import { Reducer } from 'redux';
import { ResponseSuccess } from '@/constants/response'
import { Title } from  '@/ts/title';

export interface EmployeeModelState {
  total: number;
  list: [];
  current: number;
  params: {
    departmentId?: string | undefined,
    subdepartmentId? :string | undefined
  }
}

export interface EmployeeModelType {
  namespace: 'title';
  state: EmployeeModelState;
  effects: {
    fetch: Effect;
    add: Effect;
    remove: Effect;
    fetchDetail: Effect;
    edit: Effect;
  };
  reducers: {
    save: Reducer<Title>;
    add: Reducer<Title>;
    title: Reducer<Title>;
    detail: Reducer<Title>;
  };
}

const Model: EmployeeModelType = {
  namespace: 'title',

  state: {
    total: 0,
    list: [],
    current: 1,
    params: {}
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
            total: response.data.count,
            current: payload && payload.current ? payload.current : 1,
            params: {
              name: payload && payload.name ? payload.name : undefined,
              departmentId: payload && payload.departmentId ? payload.departmentId : undefined,
              subdepartmentId: payload && payload.subdepartmentId ? payload.subdepartmentId : undefined,
            }
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
    // 获取详情
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(queryDetail, payload);
      if(response.code === ResponseSuccess){
        yield put({
          type: 'detail',
          payload: {
            data: response.data,
            key: payload
          }
        });
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
        current: action.payload.current,
        params: {
          name: action.payload.params && action.payload.params.name ? action.payload.params.name : undefined,
          departmentId: action.payload.params && action.payload.params.departmentId ? action.payload.params.departmentId : undefined,
          subdepartmentId: action.payload.params && action.payload.params.subdepartmentId ? action.payload.params.subdepartmentId : undefined
        }
      };
    },
    add(state, action) {
      return {
        ...state,
        [action.payload.key]: action.payload.data
      };
    },
    title(state, action) {
      return {
        ...state,
        title: action.payload,
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
