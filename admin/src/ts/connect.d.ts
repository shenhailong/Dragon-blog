import { GlobalModelState } from './global';
import { MenuData } from '@/ts/menu';

/**
 * * 定义导航
 * TODO: 暂时未定义
 */
export interface menu {
  breadcrumbNameMap: any;
  menuData: MenuData
}

/**
 * * 定义Connect
 * TODO: 暂时保证不报错，之后再完善
 */
export interface ConnectState {
  global: GlobalModelState;
  // loading: Loading;
  // settings: SettingModelState;
  // user: UserModelState;
  menu: menu
}


/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;


/**
 * * 定义Connect
 * TODO: 暂时保证不报错，之后再完善
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps {
  dispatch: Dispatch;
  route?: any;
}
