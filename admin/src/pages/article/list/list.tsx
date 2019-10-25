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
import { ARTICLE_STATUS, LIST, DRAFT, DELIST, ARTICLE_STATUS_LIST } from '@/constants/status';
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
  category: {
    allList: Category[];
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
          align: 'center',
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          render: (text: string, record: Article) => (
            <a onClick={() => { this.add('Detail', record.title, record.id) }} href="javascript:;">{text}</a>
          )
        },
        {
          align: 'center',
          title: '关键字',
          dataIndex: 'keyword',
          key: 'keyword',
        },
        {
          align: 'center',
          title: '所属分类',
          dataIndex: 'category.name',
          key: 'category.id',
        },
        {
          align: 'center',
          title: '封面图',
          dataIndex: 'img',
          key: 'img',
          render: (text: string, record: Article) => (
            <img src={text} height="60px" width="60px" />
          )
        },
        {
          align: 'center',
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          render: (text: string, record: Article) => (
            <div>{ARTICLE_STATUS[record.status]}</div>
          )
        },
        {
          align: 'center',
          title: '是否原创',
          dataIndex: 'isOriginal',
          key: 'isOriginal',
          render: (text: boolean, record: Article) => (
            <span>{text ? '是' : '否'}</span>
          )
        },
        {
          align: 'center',
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        },
        {
          align: 'center',
          title: '操作',
          render: (text: any, record: Article) => (
            <span>
              <Button onClick={() => { this.add('Edit', `编辑-${record.title}`, record.id) }} type="primary">编辑</Button>
              <Divider type="vertical" />
              <Button className={(record.status === DELIST || record.status === DRAFT) ? 'button-color-green' : 'button-color-sunset'} onClick={() => { this.changeStatus(record) }} type="primary">
                {(record.status === DELIST || record.status === DRAFT) ? '发布' : '下架'}
              </Button>
              <Divider type="vertical" />
              <Button onClick={() => { this.deleteData(record.id, record.title) }} type="danger">删除</Button>
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
      type: 'category/all',
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
      form: { getFieldDecorator },
      category: { allList }
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标题">
              {getFieldDecorator('title')(<Input placeholder="请输入文章标题" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="分类">
              {getFieldDecorator('categoryId', {
                initialValue: ''
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value={''} key={'selectEmpty'}>全部</Option>
                  {
                    allList.map( (item: Category) => {
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
      form: { getFieldDecorator },
      category: { allList }
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
              {getFieldDecorator('categoryId', {
                initialValue: ''
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value={''} key={'selectEmpty'}>全部</Option>
                  {
                    allList.map( (item: Category) => {
                      return (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {
                    ARTICLE_STATUS_LIST.map( (item: any) => {
                      return (
                        <Option value={item.value} key={item.value}>{item.label}</Option>
                      )
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否原创">
              {getFieldDecorator('isOriginal')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value='1'>是</Option>
                  <Option value='0'>否</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="创建开始日期">
              {getFieldDecorator('createdAt')(
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

      dispatch({
        type: 'article/list',
        payload: values,
      });
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
  deleteData = (id: any, name: string) => {
    const { dispatch, article: {params} } = this.props;
    Modal.confirm({
      title: '删除文章',
      content: `确定删除文章--${name}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
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
    });
  };

  // 改变状态
  changeStatus = (record: Article) => {
    const { dispatch, article: {params} } = this.props;
    const title =  record.status === DELIST || record.status === DRAFT ? '发布' : '下架'
    const newStatus =  record.status === DELIST || record.status === DRAFT ? LIST : DELIST
    let sendData = {
      id: record.id,
      data: {
        status: newStatus
      }
    }
    Modal.confirm({
      title: `${title}文章`,
      content: `确定${title}文章--${record.title}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'article/status',
          payload: {
            ...sendData
          },
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
    dispatch({
      type: 'article/list',
      payload: param
    });
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
