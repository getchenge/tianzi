import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tooltip, Icon, Cascader, Select, Spin, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
import styles from './style.scss';
import debounce from 'lodash.debounce';
const request = require('../../utils/request');

class SendForm extends Component {
  constructor(props) {
    super(props);
    this.fetchUser = debounce(this.fetchUser, 800);
  }
  state = {
    data: [],
    value: [],
    fetching: false,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const dispatch = this.props.dispatch;
    const values = this.props.form.getFieldsValue();
    const to = values.to && values.to.map(item => item.key);
    const payload = Object.assign({}, values, { to });
    dispatch({
      type: 'users/send',
      payload
    }).then((e) => {
      if (!e) {
        message.success('发送成功');
      }
    });
    // dispatch({
    //   type: 'sections/create',
    //   payload: values,
    // }).then(() => {
    //   message.success('创建成功');
    //   this.props.history.push(`/dashboard/`);
    // });
  }
  add = () => {
    uuid++;
    const { form } = this.props;
    const keys = form.getFieldValue('fields');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      fields: nextKeys
    });
  }
  searchInput = (e) => {
    const { form, dispatch } = this.props;
    const query = e.target.value || '';
    console.info('query_', query);
    const { data, headers } = request(`/api/users?search=${query}`, {
      method: 'GET'
    });
    form.setFieldsValue({
      to: data
    });
  }

  fetchUser = (query) => {
    const me = this;
    const { dispatch, form } = this.props;
    console.info('fetchUser', query);
    if (!query) {
      return;
    }
    // dispatch({ type: 'users/search', payload: { query } });
    me.setState({ data: [], fetching: true });
    request(`/api/users?search=${query}`, {
      method: 'GET'
    }).then((resp) => {
      me.setState({
        data: resp.data,
        fetching: false
      });
      // form.setFieldsValue({
      //   to: data
      // });
    });

  }
  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }
  // handleChange = (value) => {
  //   const { form } = this.props;
  //   const to = form.getFieldValue('to');
  //   console.info('to__', to, value);
  //   form.setFieldsValue({ to: value });
  // }
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 8 },
    };
    const { form, list, loading } = this.props;
    const { fetching, data, value } = this.state;
    const { getFieldDecorator } = form;
    console.info('fetching', fetching);
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} className={styles['input-wraper']} label="To">
          {getFieldDecorator('to', {
            rules: [{
              required: true,
              message: 'Please input your name',
            }]
          })(
            <Select
              mode="multiple"
              labelInValue
              placeholder="查找用户"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={this.fetchUser}
              onChange={this.handleChange}
              style={{ width: '100%' }}
            >
              {data.map(d => {
                const remark = d.remark ? ` (${d.remark})` : '';
                return <Option key={d.openid}>{d.nickname}{remark}</Option>
              })}
            </Select>
            )}
          <ul className={styles.advice}>
            <li className={styles['advice-item']}>
              <img className={styles.avatar} src="" alt="" />
              <span className={styles.name}>名字</span>
              <span className={styles.remark}>备注</span>
            </li>
          </ul>
        </FormItem>
        <FormItem {...formItemLayout} label="Message">
          {getFieldDecorator('message', {
            rules: [{
              required: true,
              message: '请输入发送内容',
            }],
          })(
            <TextArea placeholder="发送内容" />
            )}
        </FormItem>
        <FormItem {...formTailLayout}>
          <Button className={styles.submit} type="primary" onClick={this.handleSubmit}>发送</Button>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  const { list, total, page } = state.sections;
  return {
    loading: state.loading.models.sections,
    list
  };
}
export default connect()(SendForm);