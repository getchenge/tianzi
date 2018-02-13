import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;

import { Link } from 'dva/router';
import styles from './style.scss';

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const dispatch = this.props.dispatch;
    const values = this.props.form.getFieldsValue();
    dispatch({
      type: 'users/login',
      payload: values,
    }).then((res) => {
      if (res && res.err) {
        return message.error(res.msg);
      }
      message.success('登录成功');
      this.props.history.push(`/`);
    });
  }
  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入账号' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
        </FormItem>
        <Button type="primary" htmlType="submit" className={styles.submit}>
          登录
        </Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    users: list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Login);