import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Button,
  Table,
  Divider,
  Card,
  Form,
  Modal
} from 'antd';
import { insideAddTabData }from '@/ts/tabs'
import {FormComponentProps} from 'antd/lib/form/Form';
import { employee } from '@/ts/employee'
import { ConnectProps } from '@/ts/connect';
import styles from './list.less'

interface IOwnProps {
  addTabHandler: (data: insideAddTabData) => void;
  department: {
    list: [];
    total: number;
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
          title: '分类名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '排序',
          dataIndex: 'order',
          align: 'center',
          key: 'order'
        },
        {
          title: '状态',
          dataIndex: 'status',
          align: 'center',
          key: 'status',
          render: (status: number) => (
            <span>{status ? '开启' : '关闭'}</span>
          )
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
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'category/list',
      });
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
    const { dispatch } = this.props;
    Modal.confirm({
      title: '删除部门',
      content: `确定删除部门--${name}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        if (dispatch) {
          dispatch({
            type: 'department/remove',
            payload: id,
            callback: () => {
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

  handleTableChange = (pagination: any) => {
    const { dispatch } = this.props;
    let params = {
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize
    }
    if (dispatch) {
      dispatch({
        type: 'department/fetch',
        payload: params
      });
    }
  }

  render () {
    const { columns } = this.state
    const {
      category: {list, total}
    } = this.props;
    const pagination = {
      // showSizeChanger: true,
      // pageSizeOptions: ['10', '20', '30', '50'],
      total
    };
    console.log(list)

    return (
      <div>
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.add('Edit', '新建部门')}>
                新建
              </Button>
            </div>
          </div>
        </Card>
        <Card>
          <Table bordered={true} dataSource={list} columns={columns} rowKey="id" pagination={pagination} onChange={this.handleTableChange}/>
        </Card>
      </div>
    )
  }
}

const App = Form.create<IProps>({})(Index);

export default connect(({ category }: { category: {
  list: employee[];
  total: number;
} }) => ({
  category
}))(App);
