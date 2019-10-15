import React, { PureComponent } from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import styles from './index.less'
interface IOwnProps {}

interface IDispatchProps {}

interface IStates {}

type IProps = IOwnProps & IDispatchProps;

class Index extends PureComponent<IProps, IStates> {
  logout = () => {
    window.localStorage.removeItem('user');
    window.location.href = '/'
  }
  render () {
    const user = window.localStorage.getItem('user');
    let name = ''
    if(user){
      name = JSON.parse(user).username
    }
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.logout}><Icon type="logout" />退出登陆</Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.wrap}>
        <Dropdown overlay={menu} >
          <div className={styles.tab_operate}>
           {name}<Icon type="down" className={styles.icon} />
          </div>
        </Dropdown>
      </div>
    )
  }
}

export default Index
