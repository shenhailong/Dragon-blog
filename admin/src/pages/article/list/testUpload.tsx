import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Radio,
  Upload,
  Icon,
  message
} from 'antd';
import { connect } from 'dva';
import { formItemLeftLayout, submitFormLayout} from '@/constants/formStyle'
import {FormComponentProps} from 'antd/lib/form/Form';

import { ConnectState, ConnectProps } from '@/ts/connect';
import { Category } from '@/ts/category';
import { Article } from '@/ts/article';
import SimpleMDE from 'simplemde';
import marked from 'marked';
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css';
// import './style.less';
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
interface IOwnProps {
  id?: string | number;
  form: any;
  category: {
    allList: Category[];
  };
  removeTabHandler: (targetKey: string) => void
}

interface IDispatchProps {}

interface IStates {
  submitting: boolean;
  detail: Article;
  editor: any;
  fileList: {
    uid: string | number;
    status: string,
    url: string
  }[]
}

type IProps = IOwnProps & IDispatchProps & ConnectProps & FormComponentProps;

class Edit extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps & FormComponentProps>){
    super(props)
    this.state = {
      submitting: false,
      detail: {
        title: '',
        keyword: '',
        isOriginal: true,
        categoryId: '',
        content: '',
        status: '',
        img: ''
      },
      editor: null,
      fileList: []
    }
  }

  componentDidMount() {
    const { dispatch, id, category, form: { setFieldsValue } } = this.props;
    this.setState({
      editor: new SimpleMDE({
        element: document.getElementById('content').childElementCount,
        autofocus: true,
        autosave: true,
        previewRender(plainText: any) {
          return marked(plainText, {
            renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight(code: any) {
              return highlight.highlightAuto(code).value;
            },
          });
        },
      })
    }, () => {
      this.state.editor.codemirror.on("change", () => {
        setFieldsValue({
          content: this.state.editor.value()
        })
      });
    })

    // 获取分类
    if(!category.allList.length){
      dispatch({
        type: 'category/all',
      });
    }

    if(id){
      dispatch({
        type: 'article/detail',
        payload: id,
        callback: (data: Article) => {
          this.setState({
            detail: data
          })
          this.state.editor.value(data.content)
        }
      });
    }
  }

  normFile = (e: any) => {
    console.log('?????')
    if (Array.isArray(e)) {
      return e;
    }
    console.log(e)
    if(e.file.status === 'done'){
      if(e.file.response.code === 1){
        return e.file.response.data.path
      }
    }
    console.log(e)
    return e && e.file.response && e.file.response.data.path;
  };

  handleSubmit = (e: any) => {
    const { form, dispatch, id } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        let sendData = id ? {
          id: id,
          data: values
        } : {
          ...values
        }
        dispatch({
          type: `article/${id ? 'edit' : 'add'}`,
          payload: {
            ...sendData
          },
          callback: () => {
            this.props.removeTabHandler(`Edit${id}`)
            // 重新获取table列表（需要加上之前的搜索条件）
            dispatch({
              type: 'article/list',
              payload: {
                // ...params
              }
            });
          }
        });
      }
    });
  };

  render () {
    const {
      form: { getFieldDecorator },
      category: { allList }
    } = this.props;
    let detail = this.state.detail
    const props = {
      name: 'file',
      action: '/api/v1/upload',
      headers: {
        authorization: 'authorization-text',
      },
      accept: 'image/*',
      onChange(info: any) {
        console.log('dasdadsaa')
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <Card>
        <Form {...formItemLeftLayout} onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
          <Form.Item label="所属分类">
            {getFieldDecorator('categoryId', {
              initialValue: detail ? detail.categoryId : undefined,
              rules: [
                { required: true, message: '请选择所属分类' },
              ],
            })(
              <Select placeholder="请选择所属分类">
                <Option value=''>请选择所属分类</Option>
                {
                  allList.map( (item: Category) => {
                    return (
                      <Option value={item.id} key={item.id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            )}
          </Form.Item>
          <FormItem label='标题'>
            {getFieldDecorator('title', {
              initialValue: detail ? detail.title : '',
              rules: [
                {
                  touched: true,
                  required: true,
                  message: '请输入标题',
                },
              ],
            })(<Input placeholder='请输入姓名' maxLength={30}/>)}
          </FormItem>
          <FormItem label='关键字'>
            {getFieldDecorator('keyword', {
              initialValue: detail ? detail.keyword : '',
              rules: [
                {
                  touched: true,
                  required: true,
                  message: '请输入关键字',
                },
              ],
            })(<Input placeholder='请输入姓名' maxLength={30}/>)}
          </FormItem>
          <Form.Item label="封面图" extra="">
            {getFieldDecorator('img', {
              initialValue: detail.img ? [
                {
                  uid: '-1',
                  status: 'done',
                  url: detail.img,
                }
              ] : '',
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" fileList={this.state.fileList} {...props} listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="是否原创">
            {getFieldDecorator('isOriginal', {
              initialValue: detail ? detail.isOriginal : undefined,
              rules: [
                { required: true, message: '请选择是否原创' },
              ],
            })(
              <Radio.Group>
                <Radio value='1'>是</Radio>
                <Radio value='0'>否</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <FormItem label='备注'>
            {getFieldDecorator('remark', {
              initialValue: detail ? detail.remark : undefined,
            })(<Input maxLength={100}/>)}
          </FormItem>
          <FormItem
            wrapperCol={{
              xs: { span: 22 },
              sm: { span: 22 },
              md: { span: 22 }
            }} label='文章内容'>
            {getFieldDecorator('content', {
              initialValue: detail ? detail.content : undefined,
              rules: [
                { required: true, message: '请选择是否原创' },
              ],
            })(<TextArea rows={6} />)}
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={this.state.submitting}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

const MyComponent = Form.create<IProps>()(Edit)

export default connect(({ category }: { category: {
  category: Category;
}}) => ({
  category
}))(MyComponent);
