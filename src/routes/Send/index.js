import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
const FormItem = Form.Item;
import SendForm from './form';
import styles from './style.scss';

class Send extends Component {
  fetchUser = (query) => {
    const { dispatch } = this.props;
    console.info('fetchUser', query);
    dispatch({ type: 'users/search', payload: { query } });
  }
  render() {
    const WrappedForm = Form.create()(SendForm);
    return (
      <div className={styles.container}>
        <WrappedForm fetchUser={this.fetchUser} />
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

export default connect(mapStateToProps)(Send);