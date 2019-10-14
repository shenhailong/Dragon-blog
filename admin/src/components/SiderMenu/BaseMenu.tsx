import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import { isUrl } from '@/utils/utils';
import styles from './index.less';
import { getFlatMenuKeys } from './SiderMenuUtils';
import { urlToList } from '@/utils/utils';
import { getMenuMatches } from './SiderMenuUtils';
import { location } from '@/ts/global';
import { MenuData } from '@/ts/menu';

const { SubMenu } = Menu;

interface IOwnProps {
  collapsed: boolean;
  menuData: MenuData;
  location: location;
  onHandlePage: (e: any) => void; // 点击menu

}
interface IDispatchProps {

}

interface IStates {
  pathname: string
}

type IProps = IOwnProps & IDispatchProps;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
/**
 * * 定义icon
 * TODO: 后续需要添加 ReactNode 类型TS
 */
const getIcon = (icon :string | undefined) => {
  if (typeof icon === 'string' && isUrl(icon)) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export default class BaseMenu extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps>) {
    super(props)
    this.state = {
      pathname: ''
    }
  }

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData: MenuData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter((item: MenuData) => item.name && !item.hideInMenu)
      .map((item: MenuData) => this.getSubMenuOrItem(item))
      .filter((item: MenuData) => item);
  }

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item: MenuData) => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   * TODO: location 未添加
   */
  getMenuItemPath = (item: MenuData) => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    // const { location } = this.props;
    // FIXME: 之前是link可以使用，之后报错，无法找到原因，暂时先用div
    return (
      // <div
      // >
      //   {icon}
      //   <span>{name}</span>
      // </div>
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === 'location.pathname'}
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  conversionPath = (path: string | undefined) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  //点击左侧菜单
  handleClick = (e :any)=>{
    const { onHandlePage } = this.props;
    onHandlePage(e)
  }

  // Get the currently selected menu
  getSelectedMenuKeys = (pathname: string) => {
    const { menuData } = this.props
    const flatMenuKeys = getFlatMenuKeys(menuData);

    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
  };

  componentDidMount() {
    this.setState({
      pathname: this.props.location.pathname
    })
  }

  componentWillReceiveProps(nextProps: any) {
    if(this.state.pathname !== this.props.location.pathname){
      this.setState({
        pathname: this.props.location.pathname
      })
    }
  }

  render() {
    const {
      menuData,
      location: { pathname },
    } = this.props;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(this.state.pathname);
    // if (!selectedKeys.length && openKeys) {
    //   selectedKeys = [openKeys[openKeys.length - 1]];
    // }
    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={['/basic']}
        onClick={this.handleClick}>
        {this.getNavMenuItems(menuData)}
      </Menu>
    )
  }
}
