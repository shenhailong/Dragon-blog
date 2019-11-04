import React from 'react';
import {
  message,
  Modal,
  Row,
  Col,
  Form,
  Select,
  Button,
  Input,
  Spin,
  Radio,
  DatePicker,
  Upload,
  Icon
} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;


class MakeBill extends React.Component {
  state = {
    loading: false,
    disabledOk: false,
    confirmLoading: false,
    fileList: [],
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true, confirmLoading: true });
        const submitInfo = JSON.parse(JSON.stringify(values, (key, value) => {
          if (key === 'pay_time') {
            return moment(value).format('YYYY-MM-DD');
          } else if (key === 'attachments') {
            return value.map(f => ({ ...f.saveParams, type: 1 }));
          }
          return value;
        }));
        commerceApi.saveInvoiceOfFinance(submitInfo).then(result => {
          message.success('提交成功！');
          this.props.form.resetFields();
          this.props.onClose('refresh');
          this.setState({ loading: false, confirmLoading: false });
        }, () => {
          this.setState({ loading: false, confirmLoading: false });
        });
      }
    });
  }

  closeForm = () => {
    this.props.form.resetFields();
    this.props.onClose();
  }

  getContactInfo = (id) => {
    commerceApi.getContactDetail({ id, isedit: true }, (result) => {
      this.setState({ relationContactInfo: result });
    });
  }

  render() {
    let { loading, disabledOk, confirmLoading, fileList } = this.state;
    let { form, show, incomeId, busId, details } = this.props;
    let _this = this;
    const { getFieldDecorator } = form;
    if (!Object.keys(details).length) { // 如果没有历史数据，则需要提供一些默认值
      details['invoice_type'] = 0;
    }
    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    const fullLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 20 },
      },
    };
    /**
      * 上传组件操作思路：
      * 当文件大于10M时，在调接口前，就提示报错，并且调用onRemove移除
      */
    const props = {
      accept: ".rar,.zip,.doc,.docx,.pdf,.jpg,.png",
      name: 'file',
      action: '/cmp/crm/upload',
      beforeUpload(file) {
        const isLt10M = file.size / 1024 / 1024 <= 10;
        if (!isLt10M) {
          message.error("文件大小限制在10M以下！");
          this.onRemove(file);
          return false;
        }
      },
      onRemove(file) {
        _this.setState({ fileList: fileList.filter(item => item.name !== file.name) }, () => {
          _this.props.form.setFieldsValue({ fileList: fileList });
        });
      },
      onChange(info) { // 上传中、完成、失败都会调用这个函数
        let curFileList = info.fileList;
        curFileList = curFileList.map((file) => {
          if (file.response) {
            // 这里上传组件回调的数据，有些是提供给上传组件自身使用的，所以不能不要
            // 而需要向后端提交的数据这里提前封装起来，以方便最终的提交
            let saveParams = {};
            saveParams["filename"] = file.response.data[0].filename;
            saveParams["url"] = file.response.data[0].url;
            saveParams["size"] = file.response.data[0].size;
            file["saveParams"] = saveParams;
            file['url'] = file.response.data[0].url;
          }
          return file;
        });
        curFileList = curFileList.filter(file => {
          if (file.size / 1024 / 1024 <= 10) {
            if (file.response) {
              return file.response.code === 0;
            }
            return true;
          } else {
            return false;
          }
        });
        _this.setState({ fileList: curFileList });
      },
      // fileList: fileList, // 上传组件已使用Form进行代理，所以不要再直接设置
    };

    return (
      <div>
        {
          show ? <Modal
            wrapClassName="vertical-center-modal"
            className="company-form-modal"
            title="申请发票"
            visible={show}
            width={750}
            maskClosable={false}
            onCancel={this.closeForm}
            footer={[
              <Button key="cancel" onClick={this.closeForm}>取消</Button>,
              <Button key="confirm" type="primary" loading={confirmLoading} disabled={disabledOk} onClick={this.handleSubmit}>确定</Button>
            ]}>
            <Spin spinning={loading}>
              <div className="modal-content-wrap">
                <Form>
                  <Row>
                    <FormItem {...fullLayout} label="证明材料">
                      {getFieldDecorator('attachments', {
                        initialValue: (details.attachments || []).map(f => ({
                          // 为了提供给上传组件回显
                          uid: f.id,  // 这是上传组件规定的文件唯一标识，内部会提供给Form以便正常渲染回显列表
                          name: f.filename,
                          status: 'done',
                          url: f.url,
                          // 为了迎合最终向后端提交附件时方便新老文件统一处理
                          saveParams: {
                            filename: f.filename,
                            url: f.url,
                            size: f.size
                          }
                        })),
                        rules: [{
                          required: true, message: '请上传证明材料'
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: (e) => {
                          if (Array.isArray(e)) {
                            return e;
                          }
                          return e && e.fileList;
                        }
                      })(
                        <Upload {...props}>
                          <Button>
                            <Icon type="upload" /> 上传文件
                            </Button>
                          <p className="upload-desc">支持扩展名：.rar .zip .doc .pdf .jpg .png</p>
                          <p className="upload-desc">材料包括：合同，验收单，订单截图，打款记录</p>
                        </Upload>
                      )}
                    </FormItem>
                  </Row>
                </Form>
              </div>
            </Spin>
          </Modal> : null
        }
      </div>
    )
  }
}

export default Form.create()(MakeBill);
