import { Form,Alert,Button, Input,Checkbox, Icon, Modal } from "antd";
import { connect } from "dva";
import React, {Component} from "react";
import { formatMessage } from "umi-plugin-locale";
import Link from "umi/link";
import styles from "./login.less";
import { FormComponentProps } from "antd/lib/form/Form";
import { message } from 'antd';


interface IPassProps extends FormComponentProps{}
interface IOwnProps {
  login: string;
  submitting: boolean;
}
interface IDispatchProps {
  dispatchLogin: (values:any) => void
}
interface IStates {
  autoLogin: boolean;
}

type IProps = IPassProps & IOwnProps & IDispatchProps;


function mapStateToProps(state: any, ownProps: any) {
  // console.log(state);
  return {
    login: state.login,
    submitting: state.loading.effects["login/login"],
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any) {
  return {
    dispatchLogin(values: any) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values
        }
      })
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component<IProps, IStates> {
   public state = {
    autoLogin: true
  };

   public changeAutoLogin = (e: any) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err) {
        if(values.username !== 'admin' || values.password !== 'JCLwBNCzbKnGwB6F'){
          message.error('请输入正确的用户名或密码')
        }else{
          this.props.dispatchLogin(values)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { login, submitting } = this.props;
    const { autoLogin } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.main}>
        <Form.Item>
          {getFieldDecorator('username', {rules: [{
            required: true, message: '请输入用户名'
          }]})(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="用户名"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password',{rules:[{
            required: true, message: '请输入密码'
          }]})(
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              type="password"
              placeholder="密码"/>
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

export default Form.create({ name: 'user_login' })(Login);
