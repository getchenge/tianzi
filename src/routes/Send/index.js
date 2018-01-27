import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
const FormItem = Form.Item;
import SendForm from './form';
import styles from './style.scss';
import search from '../../utils/search';

class Send extends Component {
  fetchUser = (query) => {
    const { dispatch } = this.props;
    console.info('fetchUser', query);
    dispatch({ type: 'users/search', payload: { query } });
  }
  render() {
    const { location, tags } = this.props;
    const searchObj = search(location);
    const isTags = searchObj.type && searchObj.type === 'tags';
    const WrappedForm = Form.create()(SendForm);
    console.info('send~~', searchObj, isTags);
    return (
      <div className={styles.container}>
        <WrappedForm fetchUser={this.fetchUser} isTags={isTags} tags={tags} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list, total, page, tags } = state.users;
  return {
    loading: state.loading.models.users,
    users: list,
    total,
    page,
    tags
  };
}

export default connect(mapStateToProps)(Send);