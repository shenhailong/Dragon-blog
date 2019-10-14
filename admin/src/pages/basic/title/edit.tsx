import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  InputNumber
} from 'antd';
import { connect } from 'dva';
import { Title } from '@/ts/title'
import { Department } from '@/ts/department'
import { formItemLayout, submitFormLayout} from '@/constants/formStyle'
import { ConnectProps } from '@/ts/connect';

const FormItem = Form.Item;
const { Option } = Select;

interface IOwnProps {
  id?: string | number;
  form: any;
  title: {
    [key: string]: any;
  };
  basic: {
    department: Department[]
  }
  removeTabHandler: (targetKey: string) => void
}

interface IDispatchProps {}

interface IStates {
  submitting: boolean;
}

type IProps = IOwnProps & IDispatchProps & ConnectProps;

class Edit extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps>){
    super(props)
    this.state = {
      submitting: false
    }
  }

  componentDidMount() {
    const { dispatch, id, basic } = this.props;
    if(!basic.department.length){
      if(dispatch){
        dispatch({
          type: 'basic/fetchDepartmentAll',
        });
      }
    }

    if(id){
      if(dispatch){
        dispatch({
          type: 'title/fetchDetail',
          payload: id
        });
      }
    }
  }

  // 提交
  handleSubmit = (e: any) => {
    const { form, dispatch, id, title: {params} } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        let sendData = id ? {
          id: id,
          data: values
        } : {
          ...values
        }
        if(dispatch){
          dispatch({
            type: `title/${id ? 'edit' : 'add'}`,
            payload: {
              ...sendData
            },
            callback: () => {
              this.props.removeTabHandler(`Edit${id}`)
              // 重新更新全部职务列表
              dispatch({
                type: 'basic/fetchTitleAll',
              });
              // 重新获取职务table列表（需要加上之前的搜索条件）
              dispatch({
                type: 'title/fetch',
                payload: {
                  ...params
                }
              });
            }
          });
        }
      }
    });
  };

  render () {
    const {
      form: { getFieldDecorator },
      basic: { department },
      id
    } = this.props;
    if(id){
      var detail = this.props.title[id] ? this.props.title[id] : {}
    }
    let filterDepartment = department.filter((item: { pid: number}) => item.pid < 0)

    return (
      <Card>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
          <Form.Item label="所属部门">
            {getFieldDecorator('departmentId', {
              initialValue: detail ? detail.departmentId : undefined,
              rules: [
                { required: true, message: '请选择所属部门' },
              ],
            })(
              <Select placeholder="请选择所属部门">
                {
                  filterDepartment.map( (item: Department) => {
                    return (
                      <Option value={item.id} key={item.id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            )}
          </Form.Item>
          <FormItem label='职务名称'>
            {getFieldDecorator('name', {
              initialValue: detail ? detail.name : '',
              rules: [
                {
                  touched: true,
                  required: true,
                  message: '请输入职务名称',
                },
              ],
            })(<Input placeholder='请输入职务名称' maxLength={100} />)}
          </FormItem>
          <FormItem label='排序'>
            {getFieldDecorator('order', {
              initialValue: detail ? detail.order : undefined,
              rules: [
                {
                  type: 'number',
                  touched: true,
                  required: true,
                  message: '请输入排序',
                },
              ],
            })(<InputNumber placeholder='请输入排序' min={1} max={100}/>)}
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

const MyComponent =  Form.create<IProps>({
  onFieldsChange: (props, changedFields) => {
    if(changedFields.departmentId && !changedFields.titleId){
      props.form.setFieldsValue({
        titleId: undefined
      })
    }
  }
})(Edit)

export default connect(({ title, basic }: { title: Title; basic: {
  department: Department[]
}}) => ({
  title,
  basic
}))(MyComponent);
