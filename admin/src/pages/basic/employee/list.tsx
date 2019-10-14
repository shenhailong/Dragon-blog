import React, { PureComponent } from 'react';
import { connect } from 'dva';

import {
  Button,
  Table,
  Divider,
  Card,
  Row,
  Col,
  Form,
  Select,
  Input,
  Icon,
  DatePicker,
  Modal
} from 'antd';
import { insideAddTabData }from '@/ts/tabs'
import {FormComponentProps} from 'antd/lib/form/Form';
import { employee} from '@/ts/employee'
import { Department } from '@/ts/department'

import { ConnectState, ConnectProps } from '@/ts/connect';

import styles from './list.less'
const FormItem = Form.Item;
const { Option } = Select;

interface IOwnProps {
  addTabHandler: (data: insideAddTabData) => void;
  employee: {
    list: employee[];
    total: number;
    current: number;
    department: Department[];
    params: {};
  };
  basic: {
    department: Department[]
  }
}

interface IDispatchProps {
  form: any
}

interface IStates {
  expandForm: boolean;
  columns: any;
  dataSource: any;
}

interface columnsData {
  name: string;
  id: number;
}
type IProps = IOwnProps & IDispatchProps & FormComponentProps & ConnectProps;

@connect(({ employee }: { employee: employee }) => ({
  employee
}))

class Index extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps> & FormComponentProps){
    super(props)
    this.state = {
      expandForm: false,
      columns: [
        {
          title: '所属部门',
          dataIndex: 'department.name',
          key: 'department',
        },
        {
          title: '员工名',
          dataIndex: 'name',
          key: 'name',
          render: (text: string, record: columnsData) => (
            <a onClick={() => { this.add('Detail', record.name, record.id) }} href="javascript:;">{text}</a>
          )
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          render: (text: boolean, record: columnsData) => (
            <span>{text ? '男' : '女'}</span>
          )
        },
        {
          title: '职务',
          dataIndex: 'title.name',
          key: 'title',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '分机号',
          dataIndex: 'extNumber',
          key: 'extNumber',
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        },
        {
          title: '操作',
          align: 'center',
          render: (text: any, record: columnsData) => (
            <span>
              <a onClick={() => { this.add('Edit', `编辑-${record.name}`, record.id) }} href="javascript:;">编辑</a>
              <Divider type="vertical" />
              <a onClick={() => { this.deleteData(record.id, record.name) }} href="javascript:;">删除</a>
            </span>
          ),
        },
      ],
      dataSource: []
    }
  }

  componentDidMount() {
    const { dispatch, basic} = this.props;
    if (dispatch) {
      dispatch({
        type: 'employee/fetch',
      });
    }

    if(!basic.department.length){
      if(dispatch){
        dispatch({
          type: 'basic/fetchDepartmentAll',
        });
      }
    }
  }

  add = (type: string, title: string, id?: string | number) =>{
    this.props.addTabHandler({
      title: title,
      key: type + id,
      content: type,
      closable: true,
      id: id
    })
  }

  // 查询表单简单模式
  renderSimpleForm() {
    const {
      form: { getFieldDecorator, getFieldValue },
      basic: { department },
    } = this.props;

    let departmentId = getFieldValue('departmentId')
    let filterDepartment= department.filter((item: Department) => item.pid < 0)
    let subdepartment= department.filter((item: Department) => item.pid === departmentId)
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="员工姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="部门">
              {getFieldDecorator('departmentId', {
                initialValue: ''
              })(
                <Select onChange={this.departmentOnChange} placeholder="请选择" style={{ width: '100%' }}>
                  <Option value={''} key={'selectEmpty'}>全部</Option>
                  {
                    filterDepartment.map( (item: Department) => {
                      return (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="部门(二级)">
              {getFieldDecorator('subdepartmentId', {
                initialValue: ''
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value={''} key={'selectEmpty'}>全部</Option>
                  {
                    subdepartment.map( (item: Department) => {
                      return (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          {/* <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col> */}
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a> */}
          </div>
        </div>
      </Form>
    );
  }

  // 查询表单复杂模式
  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
      basic: { department },
    } = this.props;

    let filterDepartment= department.filter((item: Department) => item.pid < 0)

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="员工姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="部门">
              {getFieldDecorator('departmentId')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {
                    filterDepartment.map( (item: Department) => {
                      return (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="性别">
              {getFieldDecorator('sex')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="员工状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="员工类型">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="入职日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  // 选择部门有变化需要重置二级部门
  departmentOnChange = () => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      subdepartmentId: ''
    })
  }

  // 搜索
  handleSearch = (e: any) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err: any, fieldsValue: any) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        offset: 0
      };

      if(dispatch){
        dispatch({
          type: 'employee/fetch',
          payload: values,
        });
      }
    });
  };

  // 重置
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  // 切简单搜索还是复杂搜索，这里搜索条件不多只用简单模式，留着以后使用
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  // 删除
  deleteData = (id: number, name: string) => {
    const { dispatch, employee: {params} } = this.props;

    Modal.confirm({
      title: '删除员工',
      content: `确定删除员工--${name}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        if (dispatch) {
          dispatch({
            type: 'employee/remove',
            payload: id,
            callback: () => {
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

  handleTableChange = (pagination: any) => {
    const { dispatch, employee: {params} } = this.props;
    let param = {
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      current: pagination.current,
      ...params
    }
    if (dispatch) {
      dispatch({
        type: 'employee/fetch',
        payload: param
      });
    }
  }

  render () {
    const { columns } = this.state
    const {
      employee: {list, total, current}
    } = this.props;

    const pagination = {
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '50'],
      total,
      current: current
    };

    return (
      <div>
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.add('Edit', '新建员工')}>
                新建
              </Button>
            </div>
          </div>
        </Card>
        <Card>
          <Table dataSource={list} columns={columns} rowKey="id" pagination={pagination} onChange={this.handleTableChange}/>
        </Card>
      </div>
    )
  }
}

const App = Form.create<IProps>({})(Index);

export default connect(({ employee, basic }: { employee: {
  list: employee[];
  total: number;
  current: number;
}, basic: {
  department: Department[]}
}) => ({
  employee,
  basic
}))(App);
