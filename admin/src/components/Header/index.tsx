import React, { Component } from 'react';
import { Icon, Layout } from 'antd';
import BreadcrumbView from '@/components/Breadcrumb'
import HeaderRight from '@/components/HeaderRight'
import styles from './index.less'
const { Header } = Layout;

interface IOwnProps {
  collapsed: boolean
  toggle: () => void
  breadcrumbNameMap: any,
  location: any
}

interface IDispatchProps {}

interface IStates {}

type IProps = IOwnProps & IDispatchProps;

class Index extends Component<IProps, IStates> {
  render () {
    const { collapsed, toggle, breadcrumbNameMap } = this.props;
    return (
      <Header className={styles.header} style={{ background: '#fff', padding: 0 }}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
        <BreadcrumbView breadcrumbNameMap={breadcrumbNameMap} location={this.props.location}/>
        <HeaderRight />
      </Header>
    )
  }
}

export default Index
