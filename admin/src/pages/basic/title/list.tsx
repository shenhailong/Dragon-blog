import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Button,
  Table,
  Divider,
  Card,
  Form,
  Modal,
  Row,
  Col,
  Select,
} from 'antd';
import { insideAddTabData }from '@/ts/tabs'
import { FormComponentProps } from 'antd/lib/form/Form';
import { employee} from '@/ts/employee'
import { Department } from '@/ts/department'

import { ConnectProps } from '@/ts/connect';
import styles from './list.less'
const { Option } = Select;
const FormItem = Form.Item;

interface IOwnProps {
  addTabHandler: (data: insideAddTabData) => void;
  title: {
    list: [];
    total: number;
    current: number;
    params: {}
  },
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
  pid: number
}
type IProps = IOwnProps & IDispatchProps & FormComponentProps & ConnectProps;

class Index extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps> & FormComponentProps){
    super(props)
    this.state = {
      expandForm: false,
      columns: [
        {
          title: '职务名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '所属部门',
          dataIndex: 'department.name',
          key: 'department'
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
        type: 'title/fetch',
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

  // 删除
  deleteData = (id: number, name: string) => {
    const { dispatch, title: {params} } = this.props;

    Modal.confirm({
      title: '删除部门',
      content: `确定删除部门--${name}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        if (dispatch) {
          dispatch({
            type: 'title/remove',
            payload: id,
            callback: () => {
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

  // table条数变化
  handleTableChange = (pagination: any) => {
    const { dispatch, title: {params} } = this.props;
    let param = {
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      current: pagination.current,
      ...params
    }
    if (dispatch) {
      dispatch({
        type: 'title/fetch',
        payload: param
      });
    }
  }

  // 搜索条件form（简单模式）
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
      basic: { department },
    } = this.props;

    let filterDepartment= department.filter((item: Department) => item.pid < 0)
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="部门">
              {getFieldDecorator('departmentId', {
                initialValue: ''
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
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
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>

      </Form>
    );
  }

  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
  };

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
          type: 'title/fetch',
          payload: values,
        });
      }
    });
  };

  render () {
    const { columns } = this.state
    const {
      title: {list, total, current}
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
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.add('Edit', '新建职务')}>
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

export default connect(({ title, basic }:
  {
    title: {
      list: employee[];
      total: number;
    };
    basic: {
      department: Department[]
    }
  }
) => ({
  title,
  basic
}))(App);
