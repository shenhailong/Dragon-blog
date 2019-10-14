import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi/locale';
import { MenuData } from '@/ts/menu';
import Authorized from '@/utils/Authorized';
import { Reducer } from 'redux';
import { Effect } from 'dva';

const { check } = Authorized;
/**
   * * Conversion router to menu.
   * TODO: 暂时保证不报错，之后再完善
   * TODO: 使用any的地方都需要完善
   */
function formatter(data: MenuData, parentAuthority: string[] | string | undefined, parentName: string) {
  return data
    .map((item: MenuData) => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }

      const result = {
        ...item,
        name: formatMessage({ id: locale, defaultMessage: item.name }),
        // name: item.name,
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter((item: MenuData) => item);
}
const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = (item: MenuData) => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = (menuData: MenuData) => {
  if (!menuData) {
    return [];
  }
  // return menuData
  return menuData
    .filter((item: MenuData) => item.name && !item.hideInMenu)
    .map((item: MenuData) => check(item.authority, getSubMenu(item)))
    .filter((item: MenuData) => item);
};

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = (menuData: MenuData) => {
  const routerMap: {
    [key: string]: string
  } = {};

  const flattenMenuData = (data: MenuData) => {
    data.forEach((menuItem: any) => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      if(menuItem.path){
        routerMap[menuItem.path] = menuItem;
      }
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};


const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export interface MenuModelState {
  menuData: [],
  breadcrumbNameMap: {},
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    getMenuData: Effect;
  };
  reducers: {
    save: Reducer<any>;
  };
}

const Model: MenuModelType = {
  namespace: 'menu',
  state: {
    menuData: [],
    breadcrumbNameMap: {},
  },

  /**
   * * 定义获取导航方法
   * TODO: 暂时保证不报错，之后再完善
   * TODO: 试用any的地方都需要完善
   */
  effects: {
    *getMenuData({ payload }, { put }) { // 服务器端获取菜单数据
      const { routes, authority } = payload;
      const menuData = filterMenuData(memoizeOneFormatter(routes, authority));
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData);
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  }
};

export default Model;
