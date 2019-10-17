import React, { PureComponent } from 'react';
import { Card } from 'antd';
interface IOwnProps {}

interface IDispatchProps {}

interface IStates {}

type IProps = IOwnProps & IDispatchProps;

class Index extends PureComponent<IProps, IStates> {
  render () {
    return (
      <Card title='基本信息'>暂无更多详细信息</Card>
    )
  }
}

export default Index
