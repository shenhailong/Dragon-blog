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
import { insideAddTabData }from '@/ts/tabs';
import {FormComponentProps} from 'antd/lib/form/Form';
import { Article } from '@/ts/article';
import { Category } from '@/ts/category';

import { ConnectState, ConnectProps } from '@/ts/connect';

import styles from './list.less'
const FormItem = Form.Item;
const { Option } = Select;

interface IOwnProps {
  addTabHandler: (data: insideAddTabData) => void;
  article: {
    list: Article[];
    total: number;
    current: number;
    params: {};
  };
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
  title: string;
  id: number;
}
type IProps = IOwnProps & IDispatchProps & FormComponentProps & ConnectProps;

@connect(({ article }: { article: Article }) => ({
  article
}))

class Index extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps> & FormComponentProps){
    super(props)
    this.state = {
      expandForm: false,
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          render: (text: string, record: columnsData) => (
            <a onClick={() => { this.add('Detail', record.title, record.id) }} href="javascript:;">{text}</a>
          )
        },
        {
          title: '关键字',
          dataIndex: 'keyword',
          key: 'keyword',
        },
        {
          title: '所属分类',
          dataIndex: 'category',
          key: 'category',
        },
        {
          title: '封面图',
          dataIndex: 'img',
          key: 'img',
          render: (text: string, record: columnsData) => (
            <a onClick={() => { this.add('Detail', record.title, record.id) }} href="javascript:;">{text}</a>
          )
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '是否原创',
          dataIndex: 'isOriginal',
          key: 'isOriginal',
          render: (text: boolean, record: columnsData) => (
            <span>{text ? '是' : '否'}</span>
          )
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
              <a onClick={() => { this.add('Edit', `编辑-${record.title}`, record.id) }} href="javascript:;">编辑</a>
              <Divider type="vertical" />
              <a onClick={() => { this.deleteData(record.id, record.title) }} href="javascript:;">删除</a>
            </span>
          ),
        },
      ],
      dataSource: []
    }
  }

  componentDidMount() {
    const { dispatch} = this.props;
    dispatch({
      type: 'article/list',
    });
    dispatch({
      type: 'category/list',
    });
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
      category
    } = this.props;

    let departmentId = getFieldValue('departmentId')
    console.log(category)
    let arr = []
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标题">
              {getFieldDecorator('name')(<Input placeholder="请输入文章标题" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="分类">
              {getFieldDecorator('departmentId', {
                initialValue: ''
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value={''} key={'selectEmpty'}>全部</Option>
                  {
                    arr.map( (item: Category) => {
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
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 查询表单复杂模式
  renderAdvancedForm() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标题">
              {getFieldDecorator('title')(<Input placeholder="请输入标题" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="关键字">
              {getFieldDecorator('keyword')(<Input placeholder="请输入关键字" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="分类">
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
            <FormItem label="状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否原创">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="创建日期">
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
          type: 'article/list',
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
    const { dispatch, article: {params} } = this.props;

    Modal.confirm({
      title: '删除文章',
      content: `确定删除文章--${name}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        if (dispatch) {
          dispatch({
            type: 'article/remove',
            payload: id,
            callback: () => {
              // 重新获取table列表（需要加上之前的搜索条件）
              dispatch({
                type: 'article/list',
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
    const { dispatch, article: {params} } = this.props;
    let param = {
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      current: pagination.current,
      ...params
    }
    if (dispatch) {
      dispatch({
        type: 'article/list',
        payload: param
      });
    }
  }

  render () {
    const { columns } = this.state
    const {
      article: {list, total, current}
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
              <Button icon="plus" type="primary" onClick={() => this.add('Edit', '新建文章')}>
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

export default connect(({ article, category }: {
  article: {
    list: Article[];
    total: number;
    current: number;
  },
  category: Category[]
}) => ({
  article,
  category
}))(App);
