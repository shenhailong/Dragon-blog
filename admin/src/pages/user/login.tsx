import JSEncrypt from 'jsencrypt';
import { Form, Alert, Button, Input, Checkbox, Icon, Modal } from "antd";
import { connect } from "dva";
import React, { Component } from "react";
import Link from "umi/link";
import styles from "./login.less";
import { FormComponentProps } from "antd/lib/form/Form";
import { message } from 'antd';
import { ConnectProps } from '@/ts/connect';


interface IPassProps extends FormComponentProps { }
interface IOwnProps {
  login: string;
  submitting: boolean;
}
interface IDispatchProps {
}
interface IStates {
  key: string;
  autoLogin: boolean;
}

type IProps = IPassProps & IOwnProps & IDispatchProps & ConnectProps;

function mapStateToProps(state: any, ownProps: any) {
  // console.log(state);
  return {
    login: state.login,
    submitting: state.loading.effects["login/login"],
  };
}

// @connect(mapStateToProps, mapDispatchToProps)
class Login extends Component<IProps, IStates> {
  public state = {
    key: '',
    autoLogin: true
  };

  public changeAutoLogin = (e: any) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  componentWillMount() {
    const { form, dispatch } = this.props;
    dispatch({
      type: 'login/getPublicKey',
      callback: (data: string) => {
        this.setState({
          key: data
        })
      }
    })
  }

  // 提交
  handleSubmit = (e: React.FormEvent) => {
    const { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        values.password = this.rsaEncrypt(values.password, this.state.key);
        dispatch({
          type: 'login/login',
          payload: {
            ...values
          },
          callback: (data: string) => {
            console.log('?')
          }
        })
      }
    });
  };

  //
  rsaEncrypt = (text: string, publicKey: string) => {
    // public key 是来自后端保存好的公钥
    // let _publicKey =
    //   "-----BEGIN PUBLIC KEY-----" + publicKey + "-----END PUBLIC KEY-----";
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    let encrypted = encrypt.encrypt(text);
    return encrypted;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { login, submitting } = this.props;
    const { autoLogin } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.main}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '请输入用户名'
            }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码'
            }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item className={styles.other}>
          {/* {getFieldDecorator('remember', {
            initialValue: true
          })(
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
          )} */}

          {/* <Link to="/" className={styles.forget}>
            忘记密码
          </Link> */}
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
          className={styles.login_form_button}>
          登录
        </Button>
      </Form>
    );
  }
}
const App = Form.create<IProps>({})(Login);

export default connect(() => ({

}))(App);
// export default Form.create({ name: 'user_login' })(Login);
