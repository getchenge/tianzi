import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import LoginForm from './form';

import { Link } from 'dva/router';
import styles from './style.scss';

class Login extends Component {

  render() {
    const { loading, history } = this.props;
    console.info('this.props', this.props);
    const FormWraper = Form.create()(LoginForm);
    return (
      <div className={styles.container}>
        <FormWraper history={history} />
      </div>
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