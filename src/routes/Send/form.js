import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tooltip, Icon, Cascader, Select, Spin, Row, Col, Checkbox, Radio, Button, AutoComplete, message } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
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
    const me = this;
    const { dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.info('validateFields__', err);
      if (!err) {
        console.log('Received values of form: ', values);
        const values = me.props.form.getFieldsValue();
        const to = values.to && values.to.map(item => item.key);
        const totag = values.totag;
        const payload = Object.assign({}, values, { to });
        dispatch({
          type: 'users/send',
          payload
        }).then((e) => {
          if (!e) {
            message.success('发送成功');
          }
        });
      }
    });

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
    });

  }
  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 8 },
    };
    const { form, list, loading, isTags, tags } = this.props;
    const { fetching, data, value } = this.state;
    const { getFieldDecorator } = form;
    const tags_options = tags instanceof Array && tags.map(tag => {
      return { label: tag.name, value: tag.id };
    });
    let tags_radios;
    console.info('tags_options__', tags_options);
    if (tags_options && tags_options.length > 0) {
      tags_radios = tags_options.map(option => {
        return (<RadioButton value={option.value}>{option.label}</RadioButton>)
      })
    }
    const toElem = !isTags ? (
      <FormItem {...formItemLayout} className={styles['input-wraper']} label="To">
        {getFieldDecorator('to', {
          rules: [{
            required: true,
            message: '请输入要通知的粉丝',
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
              let namevalue = '';
              if (d.remark) {
                namevalue = `${d.remark} (${d.nickname})`
              } else {
                namevalue = d.nickname;
              }
              return <Option key={d.openid}>{namevalue}</Option>
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
    ) : (
        <FormItem {...formItemLayout} className={styles['input-wraper']} label="To">
          {getFieldDecorator('totag', {
            rules: [{
              required: true,
              message: '请选择要通知的粉丝标签'
            }]
          })(
            <RadioGroup {...formItemLayout} options={tags_options}></RadioGroup>
            // <CheckboxGroup {...formItemLayout} options={tags_options} />
            )}
        </FormItem>
      );
    return (
      <Form onSubmit={this.handleSubmit}>
        {toElem}
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
          <Button className={styles.submit} type="primary" htmlType="submit">发送</Button>
        </FormItem>
      </Form>
    );
  }
}

// function mapStateToProps(state) {
//   const { list, total, page, tags } = state.sections;
//   return {
//     loading: state.loading.models.sections,
//     list,
//     tags
//   };
// }
export default connect()(SendForm);