import { Icon } from 'antd';
import { connect } from 'dva'
import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import logo from '../assets/logo-shrink.png';
import styles from './user-layout.less';
const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 Dragon 个人博客管理平台
  </Fragment>
);

class UserLayout extends Component {
  public render() {
    const {children} = this.props
    return (
      <div className={styles.container}>
      <div className={styles.lang}>
        {/* <SelectLang /> */}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              {/* <img alt="logo" className={styles.logo} src={logo} /> */}
              <span className={styles.title}>驿站管理平台</span>
            </Link>
          </div>
          <div className={styles.desc}>Dragon驿站</div>
        </div>
        {children}
      </div>
      {/* <GlobalFooter links={links} copyright={copyright} /> */}
    </div>
    );
  }
}

export default connect(() => ({

}))(UserLayout)
