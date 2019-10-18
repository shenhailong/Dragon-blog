import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import { Article } from '@/ts/article';

interface IOwnProps {
  id: string | number;
}

interface IDispatchProps {}

interface IStates {
  detail: any
}

type IProps = IOwnProps & IDispatchProps;

class Detail extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps>){
    super(props)
    this.state = {
      detail: null
    }
  }
  componentDidMount() {
    const { dispatch, id } = this.props;
    console.log(id)
    dispatch({
      type: 'article/detail',
      payload: id,
      callback: (data: Article) => {
        this.setState({
          detail: data
        })
      }
    });
  }
  render () {
    return (
      <Card title='基本信息'>
        <span dangerouslySetInnerHTML={{ __html: this.state.detail ?this.state.detail.content : '' }} />
      </Card>
    )
  }
}

export default connect()(Detail);
