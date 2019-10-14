import pathToRegexp from 'path-to-regexp';
import { MenuData } from '@/ts/menu';

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export const getFlatMenuKeys = (menuData: MenuData) => {
  let keys: any[] = [];
  menuData.forEach((item: any) => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};


export const getMenuMatches = (flatMenuKeys: any, path: string) =>
  flatMenuKeys.filter((item: any) => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });
