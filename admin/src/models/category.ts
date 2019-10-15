import { add } from '@/services/category';
import { message } from 'antd';
import { Effect } from 'dva';
import { Reducer } from 'redux';
import { ResponseSuccess } from '@/constants/response';
import { editData } from  '@/ts/category';
import { type } from 'os';

export interface EmployeeModelState {
  total: number;
  list: [];
  title: [];
}

export interface EmployeeModelType {
  namespace: 'category';
  state: EmployeeModelState;
  effects: {
    // fetch: Effect;
    add: Effect;
    // remove: Effect;
    // fetchDetail: Effect;
    // edit: Effect;
  };
  reducers: {
    save: Reducer<editData>;
    add: Reducer<editData>;
    detail: Reducer<editData>;
  };
}

const Model: EmployeeModelType = {
  namespace: 'category',

  state: {
    total: 0,
    list: [],
    title: []
  },

  effects: {
    // 新增
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if(response.code === ResponseSuccess){
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
