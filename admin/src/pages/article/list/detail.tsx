import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import { Article } from '@/ts/article';
// @ts-ignore
import SimpleMDE from 'simplemde';
// @ts-ignore
import marked from 'marked';
// @ts-ignore
import 'simplemde/dist/simplemde.min.css';
interface IOwnProps {
  id: string | number;
}

interface IDispatchProps {}

interface IStates {
  detail: any
  contentMarkdown: string
}

type IProps = IOwnProps & IDispatchProps;

class Detail extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps>){
    super(props)
    this.state = {
      detail: null,
      contentMarkdown: ''
    }
  }
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch({
      type: 'article/detail',
      payload: id,
      callback: (data: Article) => {
        let contentMarkdown = SimpleMDE.prototype.markdown(data.content)
        this.setState({
          contentMarkdown: contentMarkdown
        })
      }
    });
  }
  render () {
    return (
      <Card title='基本信息'>
        <span dangerouslySetInnerHTML={{ __html: this.state.contentMarkdown }} />
      </Card>
    )
  }
}

export default connect()(Detail);
