import React, { PureComponent } from 'react';
import {
  Button,
  Card,
} from 'antd';
import { connect } from 'dva';
import { Comment } from '@/ts/comment'
import { ConnectProps } from '@/ts/connect';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { message } from 'antd';

interface IOwnProps {
  id?: string | number;
  comment: {
    [key: string]: any;
  };
  removeTabHandler: (targetKey: string) => void
}

interface IDispatchProps {}

interface IStates {
  editorState: any;
  submitting: boolean;
}

type IProps = IOwnProps & IDispatchProps & ConnectProps;

class Edit extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps>){
    super(props)
    this.state = {
      submitting: false,
      // 创建一个空的editorState作为初始值
      editorState: BraftEditor.createEditorState(null)
    }
  }

  componentDidMount() {
    const { dispatch, id } = this.props;
    if(id){
      if(dispatch){
        dispatch({
          type: 'comment/fetchDetail',
          payload: id,
          callback: () => {
            var detail = this.props.comment[id] ? this.props.comment[id] : {}
            this.setState({ editorState: BraftEditor.createEditorState(detail.text) })
          }
        });
      }
    }
  }

  submitContent = () => {
    const { dispatch, id } = this.props;
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    if(this.state.editorState.isEmpty()){
      message.error('数据不能为空');
      return
    }
    let sendData = id ? {
      id: id,
      data: {
        text: htmlContent
      }
    } : {
      text: htmlContent
    }
    if(dispatch){
      dispatch({
        type: `comment/${id ? 'edit' : 'add'}`,
        payload: {
          ...sendData
        },
        callback: () => {
          this.props.removeTabHandler(`Edit${id}`)
        }
      });
    }
  }

  handleEditorChange = (editorState: any) => {
    this.setState({ editorState })
  }

  render () {
    const { editorState } = this.state
    return (
      <Card>
        <div className="my-component">
          <BraftEditor
            value={editorState}
            onChange={this.handleEditorChange}
          />
        </div>
        <Button type="primary" onClick={this.submitContent} loading={this.state.submitting}>
          提交
        </Button>
      </Card>
    )
  }
}

export default connect(({ comment }: { comment: Comment}) => ({
  comment
}))(Edit);
