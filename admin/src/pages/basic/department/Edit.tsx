import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  InputNumber,
  Radio,
  Select
} from 'antd';
import { connect } from 'dva';
import { Department } from '@/ts/department'
import { ConnectProps } from '@/ts/connect';
import { formItemLayout, submitFormLayout} from '@/constants/formStyle'
const FormItem = Form.Item;
const { Option } = Select;

interface IOwnProps {
  id?: string | number;
  form: any;
  department: {
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

  componentWillMount() {
    const { dispatch, id, basic } = this.props;
    if(id){
      if(dispatch){
        dispatch({
          type: 'department/fetchDetail',
          payload: id
        });
      }
    }

    if(!basic.department.length){
      if(dispatch){
        dispatch({
          type: 'basic/fetchDepartmentAll'
        });
      }
    }
  }

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
        if(dispatch){
          dispatch({
            type: `department/${id ? 'edit' : 'add'}`,
            payload: {
              ...sendData
            },
            callback: () => {
              this.props.removeTabHandler(`Edit${id}`)
              // 操作之后更新全部部门列表下拉框选项
              dispatch({
                type: 'basic/fetchDepartmentAll'
              });
            }
          });
        }
      }
    });
  };

  render () {
    const {
      form: { getFieldDecorator, getFieldValue },
      id,
      basic: {
        department
      }
    } = this.props;
    if(id){
      var detail = this.props.department[id] ? this.props.department[id] : {}
    }

    let pid = getFieldValue('pid') || (detail && detail.pid ? detail.pid : -1)
    let isSecond = pid !== -1 // 是否是二级部门
    // 9999是为了不为空值
    let secondValue = (detail && detail.parentDepartment ? detail.parentDepartment.id : 9999)
    let filterDepartment= department.filter((item: Department) => item.pid < 0)

    return (
      <Card>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
          <FormItem label='部门名称'>
            {getFieldDecorator('name', {
              initialValue: detail ? detail.name : '',
              rules: [
                {
                  touched: true,
                  required: true,
                  message: '请输入名称',
                },
              ],
            })(<Input placeholder='请输入名称' maxLength={100} />)}
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
          <Form.Item label="级别">
            {getFieldDecorator('pid', {
              initialValue: detail ? detail.pid : -1,
              rules: [
                { required: true, message: '请选择级别' },
              ],
            })(
              <Radio.Group>
                <Radio value={-1}>一级</Radio>
                <Radio value={secondValue}>二级</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          {
            !!isSecond &&
            <Form.Item label="所属部门">
              {getFieldDecorator('parentDepartment.id', {
                initialValue: detail && detail.parentDepartment ? detail.parentDepartment.id : undefined,
                rules: [
                  { required: true, message: '请选择所属一级部门' },
                ],
              })(
                <Select placeholder="请选择所属一级部门">
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
          }

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

const MyComponent =  Form.create<IProps>({})(Edit)

export default connect(({ department, basic }: { department: Department, basic: {
  department: Department[]
}}) => ({
  department,
  basic
}))(MyComponent);
