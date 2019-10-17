import React, { Component, Suspense } from 'react';
import { Layout, Menu, Icon } from 'antd';
import PageLoading from '../PageLoading';
import { location } from '@/ts/global';
import styles from './index.less';
const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;
const logo = 'https://mirror-gold-cdn.xitu.io/168e092e37071588c3d?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1';
const logoShrink = 'https://mirror-gold-cdn.xitu.io/168e092e37071588c3d?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1';
interface IOwnProps {
  collapsed: boolean;
  menuData: any;
  location: location;
  onHandlePage: (e: any) => void, // 点击menu
}
interface IDispatchProps {}

interface IStates {}

type IProps = IOwnProps & IDispatchProps;

class SiderMenu extends Component<IProps, IStates> {
  render() {
    return (
      <Sider style={{
        'minHeight': '100vh',
      }} trigger={null} collapsible={true} collapsed={this.props.collapsed}>
        <div className={styles.logo_wrap}>
          <img alt="logo" className={this.props.collapsed ? styles.logoShrink : styles.logo} src={this.props.collapsed ? logoShrink : logo} />
        </div>
        <Suspense fallback={<PageLoading/>}>
          <BaseMenu {...this.props}/>
        </Suspense>
      </Sider>
    );
  }
}

export default SiderMenu
