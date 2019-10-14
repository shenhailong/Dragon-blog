export interface MenuData {
  authority?: string[] | string | undefined;
  children?: MenuData[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path?: string;
  [key: string]: any;
  routes?: any
}
