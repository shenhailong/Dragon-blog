import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  InputNumber,
  Radio
} from 'antd';
import { connect } from 'dva';
import { Department } from '@/ts/department'
import { ConnectProps } from '@/ts/connect';
import { formItemLayout, submitFormLayout} from '@/constants/formStyle'
const FormItem = Form.Item;

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
    const { dispatch, id } = this.props;
    if(id){
      if(dispatch){
        dispatch({
          type: 'department/fetchDetail',
          payload: id
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
            type: `category/${id ? 'edit' : 'add'}`,
            payload: {
              ...sendData
            },
            callback: () => {
              this.props.removeTabHandler(`Edit${id}`)
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

    return (
      <Card>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
          <FormItem label='分类名称'>
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
            })(<InputNumber placeholder='请输入排序' min={1} max={100} style={{width: '200px'}} />)}
          </FormItem>
          <Form.Item label="状态">
            {getFieldDecorator('status', {
              initialValue: detail ? detail.status : true,
              rules: [
                { required: true, message: '请选择状态' },
              ],
            })(
              <Radio.Group>
                <Radio value={true}>开启</Radio>
                <Radio value={false}>关闭</Radio>
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

const MyComponent =  Form.create<IProps>({})(Edit)

export default connect(({ department, basic }: { department: Department, basic: {
  department: Department[]
}}) => ({
  department,
  basic
}))(MyComponent);
