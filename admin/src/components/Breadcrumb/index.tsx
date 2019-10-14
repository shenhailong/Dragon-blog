import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { urlToList } from '@/utils/utils';

import styles from './index.less'

export const getBreadcrumb = (breadcrumbNameMap: any, url: string) => {
  let breadcrumb = breadcrumbNameMap[url];
  return breadcrumb || {};
};
interface locationTs {
  pathname: string
}
interface IOwnProps {
  breadcrumbNameMap: any,
  location: locationTs
}

interface IDispatchProps {}

interface IStates {
  breadcrumb: any,
  pathname: string
}

type IProps = IOwnProps & IDispatchProps;

class BreadcrumbView extends Component<IProps, IStates> {
  constructor(props: Readonly<IProps>){
    super(props)
    this.state = {
      breadcrumb: null,
      pathname: ''
    }
  }

  componentDidMount() {
    const { location } = this.props;
    this.getBreadcrumbDom();
    this.setState({
      pathname: location.pathname,
    });
  }

  componentDidUpdate(preProps: any) {
    const { location } = this.props;
    if (!location || !preProps.location) {
      return;
    }
    const prePathname = preProps.location.pathname;
    if (this.state.pathname !== location.pathname) {
      this.getBreadcrumbDom();
      this.setState({
        pathname: location.pathname,
      });
    }
  }

  getBreadcrumbDom = () => {
    const breadcrumb = this.conversionBreadcrumbList();
    this.setState({
      breadcrumb,
    });
  };

  /**
   * 将参数转化为面包屑
   * Convert parameters into breadcrumbs
   */
  conversionBreadcrumbList = () => {
    const { location, breadcrumbNameMap } = this.props;
    // 根据 location 生成 面包屑
    // Generate breadcrumbs based on location
    if (location && location.pathname) {
      return this.conversionFromLocation(location, breadcrumbNameMap);
    }
    return null;
  };

  conversionFromLocation = (routerLocation: locationTs, breadcrumbNameMap: object) => {
    // Convert the url to an array
    const pathSnippets = urlToList(routerLocation.pathname);
    // Loop data mosaic routing
    const extraBreadcrumbItems = pathSnippets.map((url: string) => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      if (currentBreadcrumb.inherited) {
        return null;
      }

      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
          {currentBreadcrumb.name}
        </Breadcrumb.Item>
      ) : null;
    });
    // Add home breadcrumbs to your head
    extraBreadcrumbItems.unshift(
      <Breadcrumb.Item key="home">
        首页
      </Breadcrumb.Item>
    );
    return (
      <Breadcrumb className={styles.breadcrumb}>
        {extraBreadcrumbItems}
      </Breadcrumb>
    );
  };

  render() {
    const { breadcrumb } = this.state;
    return breadcrumb;
  }
}

export default BreadcrumbView
