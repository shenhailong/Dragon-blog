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
  comment: {
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
  text: string;
  id: number;
}
type IProps = IOwnProps & IDispatchProps & FormComponentProps & ConnectProps;

class Index extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps> & FormComponentProps){
    super(props)
    this.state = {
      expandForm: false,
      columns: [
        {
          title: '内容',
          dataIndex: 'text',
          key: 'text',
          render: (pid: string) => {
            var html = {__html: pid }
            return  <div dangerouslySetInnerHTML={html} />
          }
        },
        {
          title: '操作',
          render: (text: any, record: columnsData, index: number) => (
            <span>
              <a onClick={() => { this.add('Edit', `编辑-第${index + 1}条数据`, record.id) }} href="javascript:;">编辑</a>
              <Divider type="vertical" />
              <a onClick={() => { this.deleteData(record.id, record.id + '') }} href="javascript:;">删除</a>
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
        type: 'comment/fetch',
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
      title: '删除数据',
      content: `确定删除该数据吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        if (dispatch) {
          dispatch({
            type: 'comment/remove',
            payload: id
          });
        }
      }
    });
  };

  handleTableChange = (pagination: any) => {
    const { dispatch } = this.props;
    let params = {
      offset: (pagination.current - 1) * 10
    }
    if (dispatch) {
      dispatch({
        type: 'comment/fetch',
        payload: params
      });
    }
  }

  render () {
    const { columns } = this.state
    const {
      comment: {list, total}
    } = this.props;

    const pagination = {
      total
    };

    return (
      <div>
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.add('Edit', '新建附录')}>
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

export default connect(({ comment }: { comment: {
  list: employee[];
  total: number;
} }) => ({
  comment
}))(App);
