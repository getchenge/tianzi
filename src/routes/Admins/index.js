import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Button, Icon } from 'antd';
import styles from './style.scss';

class Admins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAccount: '',
      newPassword: ''
    }
  }
  add = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admins/create',
      payload: {
        account: this.state.newAccount,
        password: this.state.newPassword
      }
    }).then(() => {
      this.setState({
        newAccount: '',
        newPassword: ''
      });
    });
  }

  remove = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admins/remove',
      payload: {
        id: e.target.dataset.id
      }
    });
  }
  updateAccount = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admins/patch',
      payload: {
        id: e.target.dataset.id,
        account: e.target.value
      }
    });
  }
  updatePassword = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admins/patch',
      payload: {
        id: e.target.dataset.id,
        password: e.target.value
      }
    });
  }
  updateNewAccount = (e) => {
    this.setState({ newAccount: e.target.value.replace(/\s/g, '') });
  }
  updateNewPassword = (e) => {
    this.setState({ newPassword: e.target.value.replace(/\s/g, '') });
  }
  render() {
    const { admins } = this.props;
    console.info('admins', admins);
    const adminEle = admins.map(admin => {
      return (
        <div className={`${styles.item}`}>
          <div className={`${styles['input-wraper']}`}>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" id='newaccount' type="text" data-id={admin._id} onChange={this.updateAccount} defaultValue={admin.account} />
          </div>
          <div className={`${styles['input-wraper']}`}>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" id='newpassword' type="text" data-id={admin._id} onChange={this.updatePassword} defaultValue={admin.password} />
          </div>
          <div className={`${styles['input-wraper']}`}>
            <Button type='danger' data-id={admin._id} onClick={this.remove}>删除</Button>
          </div>
        </div>
      );
    });
    return (
      <div className={`${styles.container} ${styles.ptl}`}>
        {adminEle}
        <div className={`${styles.item} ${styles.add}`}>
          <div className={`${styles['input-wraper']}`}>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" id='newaccount' type="text" onChange={this.updateNewAccount} value={this.state.newAccount} />
          </div>
          <div className={`${styles['input-wraper']}`}>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" id='newpassword' type="text" onChange={this.updateNewPassword} value={this.state.newPassword} />
          </div>
          <div className={`${styles['input-wraper']}`}>
            <Button onClick={this.add}>添加</Button>
          </div>
        </div>
      </div>
    );
  }
}

// export default Admins;
function mapStateToProps(state) {
  const { list } = state.admins;
  return {
    loading: state.loading.models.admins,
    admins: list
  };
}

export default connect(mapStateToProps)(Admins);