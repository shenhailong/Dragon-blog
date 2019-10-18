import React, { Component } from 'react';
import { connect } from 'dva'
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { Router, Route } from 'react-router'
import router from 'umi/router';
import Authorized from '@/utils/Authorized';
import pathToRegexp from 'path-to-regexp';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { Layout, Tabs, Icon, Dropdown, Menu, Breadcrumb, LocaleProvider } from 'antd';
import Context from './MenuContext';
import { ConnectState, ConnectProps } from '@/ts/connect';
import { MenuData } from '@/ts/menu';
import { tabData } from '@/ts/tabs';

import SiderMenu from "../components/SiderMenu/SiderMenu";
import Header from "../components/Header";
import {DefaultIndex} from '@/constants/defaultIndex';

import styles from './app-layout.less';
const { Content, Footer } = Layout;
const { TabPane } = Tabs;

interface IOwnProps {
  onEdit: (targetKey: any, action: string) => void
}
interface IDispatchProps {
  dispatchLogin: (values: any) => void
}

interface IStates {
  collapsed: boolean
  activeKey: any
  tabList: tabData[]
  tabListKey: any[]
  routeKey: string
}

type IProps = IOwnProps & IDispatchProps & ConnectProps & MenuData;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends Component<IProps, IStates> {
  constructor(props: Readonly<IProps>) {
    super(props)
    const {routes} = props.route
    let routeKey = DefaultIndex // 设置默认页面
    let tabName = '首页';
    let tabLists = this.updateTree(routes)
    let tabList :any[] = []
    tabLists.map((v) => {
      if(v.key === routeKey){
        if(tabList.length === 0){
          v.closable = false
          v.tab = tabName
          tabList.push(v);
        }
      }
    });
    this.state = {
      collapsed: false,
      routeKey,
      activeKey: routeKey,
      tabList: tabList,
      tabListKey: [routeKey] // 保存tab列表的key
    }
  }

  componentWillMount() {
    // 没有登陆去登陆
    const user = window.localStorage.getItem('user');
    if(!user){
      router.push('/user');
    }
  }

  componentDidMount() {
    this.props.history.push({ pathname : DefaultIndex  })
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    if(dispatch){
      dispatch({
        type: 'menu/getMenuData',
        payload: { routes, authority },
      });
    }
    const { location, breadcrumbNameMap } = this.props;
  }

  /**
   * TODO: any
   */
  updateTree = (data: any) => {
    const treeData = data;
    const treeList : tabData[] = [];
    // 递归获取树列表
    const getTreeList = (data :any[]) => {
      data.forEach(node => {
        if(!node.level){
          treeList.push({
            tab: node.name,
            key: node.path,
            locale: node.locale,
            closable: true,
            content: node.component
          });
        }
        if (node.routes && node.routes.length > 0) {
          getTreeList(node.routes);
        }
      });
    };
    getTreeList(treeData);
    return treeList;
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onHandlePage = (e :any)=> {
    const { menuData } = this.props, { key } = e;
    const tabLists = this.updateTreeList(menuData);
    const {tabListKey,tabList} =  this.state;
    router.push(key)
    this.setState({
      activeKey: key
    })

    tabLists.map(v => {
      if(v.key === key){
        if(tabList.length === 0){
          v.closable = false
          this.setState({
            tabList: [...tabList, v]
          })
        }else{
          if(!tabListKey.includes(v.key)){
            this.setState({
              tabList:[...tabList,v],
              tabListKey:[...tabListKey,v.key]
            })
          }
        }
      }
    })
  }

  // 添加tab
  updateTreeList = (data :MenuData) => {
    const treeData = data;
    const treeList :tabData[] = [];
    // 递归获取树列表
    const getTreeList = (data :MenuData) => {
      data.forEach((node :MenuData) => {
        if(!node.level){
          treeList.push({
            tab: node.name,
            key: node.path,
            locale: node.locale,
            closable: true,
            content: node.component
          });
        }
        if (node.children && node.children.length > 0) {
          getTreeList(node.children);
        }
      });
    };
    getTreeList(treeData);
    return treeList;
  };

  // tab change
  onChange = (key :string) => {
    this.setState({ activeKey:key });
    router.push(key)
  }

  onEdit = (targetKey: any, action: any) => {
    this.remove(targetKey);
  }

  // 删除tab
  remove = (targetKey: string) => {
    let {activeKey} = this.state;
    let lastIndex = -1;
    this.state.tabList.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    const tabList: tabData[] = [], tabListKey: any[] = []
    this.state.tabList.map(pane => {
      if(pane.key !== targetKey){
        tabList.push(pane)
        tabListKey.push(pane.key)
      }
    });
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = tabList[lastIndex].key;
    }
    router.push(activeKey)
    this.setState({ tabList, activeKey, tabListKey });
  }

  onClickHover=(e: any)=>{
    let { key } = e,{activeKey, tabList, tabListKey, routeKey} = this.state;

    if(key === '1'){
      tabList= tabList.filter((v)=>v.key !== activeKey || v.key === routeKey)
      tabListKey = tabListKey.filter((v)=>v !== activeKey || v === routeKey)
      this.setState({
        activeKey:routeKey,
        tabList,
        tabListKey
      })
    }else if(key === '2'){
      tabList= tabList.filter((v)=>v.key === activeKey || v.key === routeKey)
      tabListKey = tabListKey.filter((v)=>v === activeKey || v === routeKey)
      this.setState({
        activeKey,
        tabList,
        tabListKey
      })
    }else if(key === '3'){
      tabList= tabList.filter((v)=>v.key === routeKey)
      tabListKey = tabListKey.filter((v)=>v === routeKey)
      this.setState({
        activeKey:routeKey,
        tabList,
        tabListKey
      })
    }
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.map(route => {
        if (route.path && pathToRegexp(route.path).test(key)) {
          routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  /**
   * TODO: operations 未添加
   */
  render() {
    const {
      menuData,
      location: { pathname },
      route: { routes },

    } = this.props;
    let {activeKey} = this.state;

    const menu = (
      <Menu onClick={this.onClickHover}>
        <Menu.Item key="1">关闭当前标签页</Menu.Item>
        <Menu.Item key="2">关闭其他标签页</Menu.Item>
        <Menu.Item key="3">关闭全部标签页</Menu.Item>
      </Menu>
    );

    const operations = (
      <Dropdown overlay={menu} >
        <a className={styles.tab_operate} href="#">
          标签操作<Icon type="down" className={styles.icon}/>
        </a>
      </Dropdown>
    );

    const routerConfig = this.getRouterAuthority(pathname, routes);
    const layout = (
      <Layout style={{ height: '100%' }}>
        <SiderMenu
          collapsed={this.state.collapsed}
          location={location}
          menuData={menuData}
          onHandlePage={this.onHandlePage}
        />
        <Layout>
          <Header
            collapsed={this.state.collapsed}
            toggle={this.toggle}
            breadcrumbNameMap={this.props.breadcrumbNameMap}
            location={location}
          />
          <Content
            style={{
              background: '#eee',
              minHeight: 280,
            }}
          >
            <Tabs
              // className={styles.tabs}
              activeKey={activeKey}
              onChange={this.onChange}
              tabBarExtraContent={operations}
              tabBarStyle={{ background: '#fff' }}
              tabPosition="top"
              animated={true}
              tabBarGutter={-1}
              hideAdd={true}
              type="editable-card"
              onEdit={this.onEdit}
              className="margin0"
            >
              {
                this.state.tabList.map((item) => (
                  <TabPane
                    style={{ padding: '10px' }}
                    tab={item.tab}
                    key={item.key}
                    closable={item.closable}>
                    <Authorized authority={routerConfig}  noMatch={<div>403</div>}>
                      <Router history={this.props.history}>
                        <Route key={item.key} path={item.path} component={item.content} />
                      </Router>
                    </Authorized>
                  </TabPane>
                  )
                )
              }
            </Tabs>
          </Content>
          <Footer style={{ textAlign: 'center' }}>博客管理平台</Footer>
        </Layout>
      </Layout>
    )
    return (
      <DocumentTitle title={'Dragon驿站'}>
        <LocaleProvider locale={zhCN}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </LocaleProvider>
      </DocumentTitle>
    )
  }
}

export default connect(({ global, menu }: ConnectState) => ({
  collapsed: global,
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap
}))(BasicLayout);
