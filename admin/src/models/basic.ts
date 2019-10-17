// import { queryDepartmentAll } from '@/services/department';
// import { queryTitleAll } from '@/services/title';

import { Effect } from 'dva';
import { Reducer } from 'redux';
import { ResponseSuccess } from '@/constants/response'
import { Department } from  '@/ts/department';
// import { Title } from  '@/ts/title';

export interface BasicModelState {
  department: [];
  title: []
}

export interface BasicModelType {
  namespace: 'basic';
  state: BasicModelState;
  effects: {
    fetchDepartmentAll: Effect;
    fetchTitleAll: Effect;
  };
  reducers: {
    department: Reducer<Department>;
    title: Reducer<Title>;
  };
}

const Model: BasicModelType = {
  namespace: 'basic',

  state: {
    department: [],
    title: []
  },

  effects: {
    // 获取全部部门列表
    *fetchDepartmentAll({ payload }, { call, put }) {
      // const response = yield call(queryDepartmentAll, payload);
      // if(response.code === ResponseSuccess){
      //   yield put({
      //     type: 'department',
      //     payload: response.data
      //   });
      // }
    },
    // 获取全部职务
    *fetchTitleAll({ payload }, { call, put }) {
      const response = yield call(queryTitleAll, payload);
      if(response.code === ResponseSuccess){
        yield put({
          type: 'title',
          payload: response.data
        });
      }
    },
  },

  reducers: {
    department(state, action) {
      return {
        ...state,
        department: action.payload,
      };
    },
    title(state, action) {
      return {
        ...state,
        title: action.payload,
      };
    }
  }
};

export default Model;
