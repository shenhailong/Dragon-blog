import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Radio
} from 'antd';
import { connect } from 'dva';
// import { Title } from '@/ts/title'
// import { Department } from '@/ts/department'
import { formItemLayout, submitFormLayout} from '@/constants/formStyle'
import { ConnectState, ConnectProps } from '@/ts/connect';

const FormItem = Form.Item;
const { Option } = Select;

interface IOwnProps {
  id?: string | number;
  form: any;
  employee: {
    [key: string]: any;
  };
  basic: {
    department: Department[];
    title: Title[]
  }
  removeTabHandler: (targetKey: string) => void
}

interface IDispatchProps {}

interface IStates {
  submitting: boolean;
  isChange: boolean
}

type IProps = IOwnProps & IDispatchProps & ConnectProps;

class Edit extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps>){
    super(props)
    this.state = {
      submitting: false,
      isChange: false
    }
  }

  componentDidMount() {
    const { dispatch, id, basic} = this.props;
    // 获取部门选项
    if(!basic.department.length){
      if(dispatch){
        dispatch({
          type: 'basic/fetchDepartmentAll',
        });
      }
    }

    if(!basic.title.length){
      if(dispatch){
        dispatch({
          type: 'basic/fetchTitleAll',
        });
      }
    }

    if(id){
      if(dispatch){
        dispatch({
          type: 'employee/fetchDetail',
          payload: id
        });
      }
    }
  }

  handleSubmit = (e: any) => {
    const { form, dispatch, id, employee: {params} } = this.props;
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
            type: `employee/${id ? 'edit' : 'add'}`,
            payload: {
              ...sendData
            },
            callback: () => {
              this.props.removeTabHandler(`Edit${id}`)
              // 重新获取table列表（需要加上之前的搜索条件）
              dispatch({
                type: 'employee/fetch',
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

  departmentOnChange = () => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      titleId: undefined,
      subdepartmentId: undefined
    })
    this.setState({
      isChange: true
    })
  }

  componentWillUnmount() {
    // 重新获取存储
    const { dispatch, id } = this.props;
    if(dispatch){
      dispatch({
        type: 'employee/fetchDetail',
        payload: id
      });
    }
  }

  render () {
    const {
      form: { getFieldDecorator, getFieldValue },
      basic: { department, title },
      id
    } = this.props;
    if(id){
      var detail = this.props.employee[id] ? this.props.employee[id] : {}
    }
    let departmentId = getFieldValue('departmentId') || (detail ? detail.departmentId : undefined)
    let filterDepartment= department.filter((item: Department) => item.pid < 0)
    let subdepartment= department.filter((item: Department) => item.pid === departmentId)
    let filterTitle = title.filter((item: Title) => item.departmentId === departmentId)

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
              <Select onChange={this.departmentOnChange} placeholder="请选择所属部门">
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
          {
            !!subdepartment.length &&
            <Form.Item label="部门(二级)">
              {getFieldDecorator('subdepartmentId', {
                initialValue: this.state.isChange ? undefined : (detail ? detail.subdepartmentId : undefined),
                rules: [
                  { required: true, message: '请选择所属部门(二级)' },
                ],
              })(
                <Select placeholder="请选择所属部门(二级)">
                  {
                    subdepartment.map( (item: Department) => {
                      return (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              )}
            </Form.Item>
          }
          <Form.Item label="职务">
            {getFieldDecorator('titleId', {
              initialValue: detail ? detail.titleId : undefined,
              rules: [
                { required: true, message: '请选择职务' },
              ],
            })(
              <Select placeholder="请选择职务">
                {
                  filterTitle.map( (item: Title) => {
                    return (
                      <Option value={item.id} key={item.id}>{item.name}</Option>
                    )
                  })
                }
              </Select>,
            )}
          </Form.Item>
          <FormItem label='姓名'>
            {getFieldDecorator('name', {
              initialValue: detail ? detail.name : '',
              rules: [
                {
                  touched: true,
                  required: true,
                  message: '请输入姓名',
                },
              ],
            })(<Input placeholder='请输入姓名' maxLength={30}/>)}
          </FormItem>
          <FormItem label='邮箱'>
            {getFieldDecorator('email', {
              initialValue: detail ? detail.email : undefined,
              rules: [
                {
                  type: 'email',
                  touched: true,
                  message: '请输入正确的邮箱',
                },
              ],
            })(<Input placeholder='请输入邮箱' maxLength={50}/>)}
          </FormItem>
          <FormItem label='分机号'>
            {getFieldDecorator('extNumber', {
              initialValue: detail ? detail.extNumber : undefined,
            })(<Input placeholder='' maxLength={20}/>)}
          </FormItem>
          <FormItem label='备注'>
            {getFieldDecorator('remark', {
              initialValue: detail ? detail.remark : undefined,
            })(<Input maxLength={100}/>)}
          </FormItem>
          <Form.Item label="性别">
            {getFieldDecorator('sex', {
              initialValue: detail ? detail.sex : undefined,
              rules: [
                { required: true, message: '请选择性别' },
              ],
            })(
              <Radio.Group>
                <Radio value={true}>男</Radio>
                <Radio value={false}>女</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="是否领导">
            {getFieldDecorator('isLeader', {
              initialValue: detail ? detail.isLeader : undefined,
              rules: [
                { required: true, message: '请选择是否领导' },
              ],
            })(
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
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
      // props.form.setFieldsValue({
      //   titleId: undefined
      // })
    }
  }
})(Edit)

export default connect(({ employee, basic }: { employee: any, basic: {
  department: Department[];
  title: Title[];
}}) => ({
  employee,
  basic
}))(MyComponent);
