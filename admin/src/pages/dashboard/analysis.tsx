// import { Form,Alert,Button, Input,Checkbox, Icon, Modal } from "antd";
// import { connect } from "dva";
import React, {Component} from "react";
// import { formatMessage } from "umi-plugin-locale";
// import Link from "umi/link";
// import styles from "./index.less";
// import { FormComponentProps } from "antd/lib/form/Form";


// interface IPassProps extends FormComponentProps{}
// interface IOwnProps {
//   login: string;
//   submitting: boolean;
// }
// interface IDispatchProps {
//   dispatchLogin: (values:any) => void
// }
// interface IStates {
//   autoLogin: boolean;
// }

// type IProps = IPassProps & IOwnProps & IDispatchProps;


// function mapStateToProps(state: any, ownProps: any) {
//   console.log(state);
//   return {
//     login: state.login,
//     submitting: state.loading.effects["login/login"],
//   };
// }

// function mapDispatchToProps(dispatch: any, ownProps: any) {
//   return {
//     dispatchLogin(values: any) {
//       dispatch({
//         type: 'login/login',
//         payload: {
//           ...values
//         }
//       })
//     }
//   };
// }

// @connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {
  //  public state = {
  //   autoLogin: true
  // };

  //  public changeAutoLogin = (e: any) => {
  //   this.setState({
  //     autoLogin: e.target.checked,
  //   });
  // }

  // handleSubmit = (e:React.FormEvent) => {
  //   e.preventDefault()
  //   this.props.form.validateFields((err, values) => {
  //     if(!err) {
  //       this.props.dispatchLogin(values)
  //     }
  //   })
  // }

  render() {
    return (
      <div>hello world</div>
    );
  }
}
